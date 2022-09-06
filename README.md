Features to add:
On hover: Watch later and add to queue buttons
Make screen bigger
Add three button side menu with options




/////////////


https://docs.google.com/document/d/19q-Wjg_wbrW5-1io9tndP0zBa7zoud10yoMh61s1fMs/edit#

MightyByte Frontend React/React Native Challenge
Take as much time as you would like for this challenge. Historically, solid candidates have taken around 4 hours to complete this challenge.
IMPORTANT: Fork the CodeSandbox project posted below and work on that fork. After finishing the project, please make sure to save all of your changes and send the finalized code sandbox link to the following email addresses. hovhannes@mightybyte.us, rodrigo@mightybyte.us, dan@mightybyte.us, vikalp@mightybyte.us with the following information.

Send any questions over to: hovhannes@mightybyte.us, rodrigo@mightybyte.us, vikalp@mightybyte.us

Subject: MightyByte Frontend <React/React Native> Challenge, <Your first and last name>

Message: The CodeSandbox link to your completed challenge as well as any additional details that you wish to include.

Note: 
There is no deadline for this challenge, but we are hiring asap.
Submissions in React Native get you bonus points, but React is fine as well :-)


IMPORTANT: The skeleton code below uses a framework called React Native Web. Please read on if you are not	familiar with it. React Native Web allows you to write both React Native and React code and both frameworks will work in browsers. For you, it means the following. We strongly recommend using purely React Native to complete this challenge. In case you are not familiar with React Native, you can complete the challenge in React (You can write React code in the provided React Native Web environment). If you are writing the challenge with React native, do not be scared by the idea that you are writing React Native code with the intention of running it in the browser (I promise it will work just fine :) ).


Getting Started
You can find the skeleton of the project Here
Fork the skeleton project and continue building on top of this skeleton project and make sure to save all the files once everything is finalized. After you are done, email your finalized CodeSandbox link to all 4 emails mentioned above, and do not forget to put the subject.

Create a React Native/React app that mimics YouTube's homepage video grid UI (highlighted in red in the screenshot below). Feel free to add other YouTube UI elements such as the header and the side drawer if you want to, but they're not required.


Pay attention to the details of the UI elements, such as animations and tooltips or video popup when hovering the mouse over things. For this video popup specifically, YouTube has a video player, but you don't need to implement that - just display the video's thumbnail image instead.

Note: Your only restriction here is to use React Native. Any frameworks or 3rd party libraries are ok to use.






Important technical details


IMPORTANT: Y In case you are writing the challenge in React native, all that we require is that the project works fine and is reasonably responsive in the preview window (Inside the browser) on the CodeSandbox website. No need to worry too much about what will happen if we run this code on a mobile device although writing code in a way to still be able to run on mobile devices is highly encouraged.
Do Not use any library frameworks besides what is provided by React/React Native to style the UI. (The preferred way will be to use
<SomeComponent style={styles.something}> approach where "styles" is a StyleSheet object or you can also use StyledComponents).
It isn't necessary to implement actions, e.g. clicking on a video or on the "watch later" button doesn't need to do anything.
The list must be an infinite scrollable list.
To get a paginated list of videos:
Create a new project on Google or use an existing one
Enable YouTube Data API v3
Create an API Key (Create credentials -> Create API Key). Make sure not to commit this API Key. Instead, store it in a file such as a `.env` file when using it, but make sure not to leak it when saving the final build (Poor man's version of .gitignore since we are working in CodeSandbox). Make sure to use any appropriate .env-related practices that you would usually use when you were working with git.
Use the search: list API
Make sure the `part` parameter is set to `snippet`, the `type` parameter is set to `video`, the `q` parameter is set to `programming`, and the `key` parameter is set to the API key you generated in the previous step.
Hint: You can also control the number of videos returned by each API call with the `maxResults` parameter.
API call example: https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=50&q=programming&key={{API_KEY}}
Skip any details not returned by the API, e.g. the number of views a video has or the channel's logo.
Instead of saying how many days/months/years ago a video was published, you can just show a date like MM/DD/YYYY.
If possible, do not use the Redux store in your implementation (Look into React-Query if you are looking for alternatives).


