import React, { Component } from 'react'
import axios from 'axios'
import './messages.scss'
import phone_icon from '../assets/phone_icon.png'
import email_icon from '../assets/email_icon.png'
import sms_icon from '../assets/sms_icon.png'
import trash_icon from '../assets/trash_icon.png'


class Messages extends Component {

  constructor(props) {
    super(props);
    this.state = {'messages': [],
                  'reqUrl': 'https://s3-us-west-2.amazonaws.com/eng-interview/Message+Center/api-data-pg1.json',
                  'nextUrl': null }
    this.trackScrolling = this.trackScrolling.bind(this);
    this.isBottom = this.isBottom.bind(this);
  }

  componentDidMount() {
    document.addEventListener('scroll', this.trackScrolling);
    const that = this;
    const reqUrl = this.state.reqUrl;
    axios.get('/get_messages', {
      params: {
        reqUrl: reqUrl
      }
    })
      .then(function(response) {
        const nextUrl = response.data.next;
        const messages = response.data.results;
        that.setState({'messages': messages, 'nextUrl': nextUrl});
      })
      .catch(function(error) {
        console.log('there was an error: ', error);
      })
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling() {
    const wrappedElement = document.getElementById('header');

    this.isBottom(wrappedElement);
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.addMoreMessages(this.state.nextUrl);
    }
  }

  addMoreMessages(nextUrl) {
    const that = this;
    axios.get('/get_messages', {
      params: {
        reqUrl: nextUrl
      }
    })
      .then(function(response) {
        const currentMessages = that.state.messages;
        const newMessages = response.data.results;
        const nextUrl = response.data.next;
        for (let i = 0; i < newMessages.length; i++) {
          currentMessages.push(newMessages[i]);
        }
        that.setState({'messages': currentMessages, 'nextUrl': nextUrl});
        document.addEventListener('scroll', that.trackScrolling);
      })
      .catch(function(error) {
        console.log('there was an error: ', error);
      })
  }

  removeMessage(ev) {
    const message = ev.target.closest('li');
    message.style.display = "none";
  }

  showMessages() {
    const that = this;
    const messages = this.state.messages;
    return messages.map(function(message) {
      const id = message.id;
      const name = message.name;
      const email = message.email;
      const text = message.message;
      const creation_time = message.creation_time;
      const thumbnail = message.thumbnail;
      const phoneNumber = message.phone;
      const initials = that.getInitials(name);
      return (
        <li key={`message-${id}`}>
          <div className={`image-container`}>
            {thumbnail !== null ? <img src={thumbnail} className={`profile-image`}></img> : <div className={`profile-initials`}>{initials}</div>}
          </div>
          <div className={`message-container`}>
            <p>
              <strong><span className={`profile-name`}>{name}</span></strong>{`"${text}"`}
            </p>
            <p className={`message-creation-time`}>
              {creation_time}
            </p>
            <div className="icon-container">
              <a href={`https://www.styleseat.com/m/p/1085666`} target={`_blank`} id={`book-provider`}>Book</a>
              <a href={`tel:+${phoneNumber}`} className={`call-provider`}><img src={phone_icon} id={`call-provider-icon`}></img></a>
              <a href={`sms:+${phoneNumber}`} className={`sms-provider`}><img src={sms_icon} id={`sms-provider-icon`}></img></a>
              <a href={`mailto:${email}`}><img src={email_icon} id={`email-provider-icon`}></img></a>
              <a onClick={ev => that.removeMessage(ev)} className={`remove-message-provider`}><img src={trash_icon} id={`remove-message-provider-icon`}></img></a>
            </div>
          </div>
        </li>
      );
    })
  }

  getInitials(name) {
    const nameSplit = name.split(' ');
    const initials = nameSplit[0][0] + nameSplit[1][0];
    return initials;
  }

  render() {

    if (this.state.messages.length > 0) {
      return (
        <ul id={`header`}>
          {this.showMessages()}
        </ul>
      );
    } else {
      return (
        <div className={`loading-messages`}>Loading messages...</div>
      );
    }
    
  }
}

export default Messages;