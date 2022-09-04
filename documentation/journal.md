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