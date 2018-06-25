## Instructions

1. Clone the repo: $git clone https://github.com/Aphinith/messages.git
2. CD into root directory
3. `npm install`
4. `npm start` (wait for bundle to finish)
5. Navigate to localhost:3000 with your browser
6. All messages will appear in one `<ul>` element with `<li>` elements containing the different messages, pictures, and clickable options
    1. The list has a maximum of width of 600px and centered on the page
    2. When browser is less than 600px, the width of the list will be at 100%, with a minimum of 300px (NOTE - please see note re responsiveness below)
    3. The bottom row actions are all functional as per requirements on document
    4. Phone and SMS icon will only appear when browser window is less than 400px (NOTE - please see note re responsiveness below)
    5. Infinite scrolling functional per requirements on document
    6. EXTRA CREDIT:
        1. Avatar: shows profile avatar image in a circle if it exists, otherwise the initials of the profile will be shown inside a circle
        2. "see more link": did not attempt

## Responsiveness Bug:

I've set the media query breakpoints to the exact specifications to meet the requirements for responsiveness, but for some odd reason, when testing it on my chrome browser, I am getting odd results. For example, using chrome's web inspector to track the window width:

  1. Begin to shrink browser's width to 400px to trigger the media query at 400px to show the phone and SMS icon
  2. Notice when window width is at 440px, the icons appear
  3. Open the console on your web inspector element and type in window.innerWidth to get the width of the window browser
  4. Notice that the console reports that the width is 400px
  5. What we would expect is for the two values (web inspector width value and value obtained from calling 'window.innerWidth' from the console) to be the same

The same issue occurs with the breakpoint that is set at 600px.

I spent some time trying to debug/research into this, but to no avail. It is possible that you might not encounter this bug and it is only happening on my machine in my environment. Another possibility is that the way React is mounting elements onto the dom might be affecting the window's browser or that my webpack configuration might be interfering with the browser as well. I unfortunately could not determine this, but wanted to let you know that this bug does exist.

