Sun 4th Sept 0830: 
    I'm confident that I understand the task at hand now. It makes sense to me to start by clarifying the acceptance criteria of the challenge. To do so, I'll use BDD to create a series of features, stories, and scenarios. I'll then be able to automate the testing of the AC with Cypress. 

Sun 4th Sept 0911:
    Making progress with the features and scenarios. But I'm finding it difficult to feel confident in the scenarios without being able to discuss them collaboratively with a team. There are always nuances that you find and questions that arise. 

    Doing this solo really highlights the power of collaboration and benefits of the ethos of BDD/Agile. 

Sun 4th Sept 0952: 
    Hit an interesting ambiguity in the challenge spec. The spec says "take all the transactions in a given week..." - does "given week" imply that the week start or end date is configurable by the user? I don't really see the benefit of being able to do that, but I think it's more due to the slightly abstract challenge here. 

    I need to make an #assumption to proceed. For now, I'll assume the user can choose the week end date. And on first load, the week will default to the current week. 

Sun 4th Sept 1000: 
    The assumption I made above is annoying me. Off the back of that, I created the user story: 
        In order to intermittently send my weekly round-ups to the saving goal
        As a customer
        I want to be able to change the week's start date

    But if you are coming to do this intermittently, why not just provide an open date range? 

    To keep this simple, I'll proceed with the initial assumption and the corresponding story. 

Sun 4th Sept 1019: 
    "User chooses end date in the future" - what should happen here? 

    #Assumption for now is that there will be a validation message telling the user to choose a date and the transactions table will be empty, and the move round-up button will be disabled

Sun 4th Sept 1100:
    What I always find fascinating when writing BDD scenarios is how detailed the AC becomes. It's gone from "Allow the user to transfer their weekly round-up to a savings goal" to 3 features and 11 scenarios. 

Sun 4th Sept 1130:
    Finished first iteration of creating BDD scenarios. Taking a break then I'll start on the site setup. 

Sun 4th Sept 1600: 
    Starting to add the dependencies and packages that I need along with the relevant ADRs for the libs that I'm using. 

Sun 4th Sept 1715: 
    Wow, I always forget how annoying it is to set up a new project. It really puts your problem solving (read: Googling) skills to the test. Cypress and the cucumber preprocessor have updated a lot since I last set them up but managed to find the relevant docs and a couple of helpful stackoverflow posts and github issues that pointed me in the right direction. 

    Happy with where I'm at and can now start on building the features. My plan is to work outside-in and take a TDD approach. So I'll start with writing a broken BDD test and then create the relevant components and supporting code to make the BDD scenario pass. Along the way, I'll uncover new components, classes and interfaces that I'll need to create and I'll build them using a TDD approach. 

Sun 4th Sept 1800: 
    I take that back. I've just spent nearly an hour debugging a configuration issue between typescript and cypress. Fixed now but that was painful. 

    Onto features!

Sun 4th Sept 1930: 
    Took a break for tea but thought I was in a good place to really get the ball rolling with features. I was wrong. I ran into a few more teething issues with the configs. This time Cypress and react testing library didn't want to play nicely with each other. 

    Eventually figured out that the cypress.config.ts must have been importing a load of chai globals. Once I ignored that in the gloval tsconfig everything started to work. 

Sun 4th Sept 2046:

    Finished for the night. Started to gain some real momentum. Managed to finish the "User sees account information" feature as a first-pass with dummy data. Getting that far involved creating a couple of entities, components, and corresponding tests. 

    I have a feeling I might need to simplify the UI a bit to get to the nitty-gritty part of the challenge of integrating with the API. 


Mon 5th Sept 0830:
    Finished the first API integration. Had a really annoying error in a failing test about a circular dependency in the axios response. Took me ages to figure out what was happening. Eventually added a custom error handler to axios to print out the http response from the Starling API and the token had expired. 

    Fixed and kept the custom error handler so the response code is returned if there is an error.  

Mon 5th Sept 0850:
    Finished the account tests. I'd like to extend the TestAccountClient to take in seed data but it's good enough for now. If I need to reuse that class in future tests I'll reconsider it. 

    Added defaultCategoryId to AccountWithBalance entity because it's needed for transactions. But it doesn't seem right for it to live there, there probably needs to be a category entity. But for this exercise, it's good enough. 

Mon 5th Sept 1245: 
    Adding transactions repository and can see a couple of improvements I'd make if this was going to be a larger project. 

    I think there's a generic interface like IRetrieve<T> that could remove the need for the specific repo interfaces. 

    I'd also want to make the return type from the transaction repo immutable. It's currently Transaction[] but I don't like that those transactions are open to being modified after returning.

Mon 5th Sept 1300: 
    Creating TransactionsClient and realising that some of the ClientConfig properties in the interface are duplicated. 
    
    Could this be a base interface with the authToken and baseURL that the clients extend to add their own endpoints to? 

Mon 5th Sept 1330:
    Making an assumption that if the amount to round up is *.00 then the round up amount is 0. 


Tue 6th Sept 0700:
    Added the savings goals repo and client. Now hooking that up to the page. 

    Starting to notice patterns that I would probably refactor if I had more time. For instance, all clients add a custom error handler to axios. I'd like to move that to a base class or wrapper around axios.

    I'd also like to create view model representations of the entities. It niggles me that the views are using the entity models but for this challenge, the entities contain only what's needed for the challenge so it would be eager optimisation at this point. 

Tue 6th Sept 1230: 
    Spent some time cleaning up the react components. Renamed the RoundUpContainer to RoundUpSummary to avoid confusion with the container pattern. 

    Also adding React Query to support re-fetching the relevant data that will change after the transfer. I'll be able to reuse the repositories that I created to fetch the data server-side. 

Tue 6th Sept 1300: 
    Added a console.error statement to the savings goal repo but ideally I'd have a logger class that handles the logging and then return a better error than 'false'. 

Tue 6th Sept 1620: 
    Working on transfer to saving goal in the repo and got the happy path working. To get the error paths working, I'd need to extend the test client and add mocks. I think that's too far for this challenge so will continue with just a test for the happy path. 

Tue 6th Sept 2100:
    Switched the app from test mode to real mode and getting CORS issues. Because it worked in the integration tests and postman, I didn't think to check the CORS headers in the browser.

    I'll add a couple of Next api routes and move the calls to the server and update the hooks to use the Next api.


Wed 7th Sept 0700: 
    Added the Next api routes and the calls to the server. That's all working now. Also noticed that the linter was complaining because there was a comma that it wasn't expecting. Removed the comma and there were a ton of linting issues. Fixed those and got the next build working. 

    Hooked up the final cypress test to test transferring the round up to a savings goal updates the account balance and the savings goal total on the screen. If I was doing this further, I would add an API endpoint to reset the test data on the server so the cypres tests can be run again and hook that up as a pre-condition in the cypress test.

    Although I would have liked to spend more time writing tests for the api routes and the react components that I updated to get more coverage, I'm happy enough with how this has turned out. Spending a couple of hours here and there and not having a great deal of time to dedicate to it, I am happy with the results. 

    The app showcases a range of skills and experience that I think will be beneficial to the role and team at Starling. 

    During this challenge, I utilised the following tools and techniques:
    * BDD acceptance criteria - taking the challenge spec and extrapolating capabiliities, features, and scenarios. Although not all scenarios were covered, I was able to get a good sense of the overall scope of the challenge.
    * Next JS - showcasing server-side rendering, api routes, and switching between live and test data
    * React - custom hooks for the api calls, custom components, and styling
    * Material UI - small use of the theme to add some branding colours to the app
    * React Testing Library
    * React Query 
    * Cypress and Cucumber - e2e tests using the BDD stories written at the start

