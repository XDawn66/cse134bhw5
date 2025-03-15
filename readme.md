# CSE 134B HW5

### Link to the website:
https://fantastic-sopapillas-ec21d2.netlify.app/

### Link to the CRUD
https://fantastic-sopapillas-ec21d2.netlify.app/pages/crud
## Key Changes Compare to HW3

- Add style hidden to the extra credit area
  - I feel those part doesn't fit the purpose of the portfolio site so I hide it. Since I hide it with by putting css display:none, the graders can still see them in code
- Change projects page to load projects dynamically using js
  - Instead of using static content, I followed the HW5 part2 and change them to load from local storage and online storage. I think this is cool since now I can change the content easily just by add/removing json to the online storage and display the most recent projects I made
- Increase the size of the img at about me page from 30 vh to 50 vh
  - This allow the images to display in a normal ratio
- Remove extra lines in footer/fill in real info
  - Remove phone number section in order to prevent spam calls and fill in real info
- Change the shadow root html sturcture from warpping p,img,and link with div to article tag
  - This gives more meaning and enhance the readability to the code
- Add more tags to the job experience template tag, and make it to load dynamically from js
  - Adding more tags provide more key information about my pervious experience. By adding js function, I can load mutliple experience from the data
