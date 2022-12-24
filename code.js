/*
  Santhosh Vijay and Krish Patel
  3/30/2022
  Blackjack Game
  This following code is the game (BlackJack)
*/

alert("You are about to play a blackjack game!");
alert("You will have $2500 to start off, gamble wisely!");

let money=2500;
let playAgain=1;
let times = 0;
let reminder = "";

function playGame()//the entire gameplay in a function so that player can infinitaly play the game as long as they want to or until they have no money
{
  let suite = ""; //the suite of the card
  let number = 0; //the true value of the card (J's true value would be 10)
  let playerSum = 0; //the sum of the player's cards
  let dealerSum = 0; //the sum of the dealer's cards
  let name = ""; //the symbol that appears on the card 
  let playerCards = ""; //shows all of the player's cards
  let dealerCards = ""; //shows all of the dealer's cards
  let busted = false; //shows if the player busted
  let blackjack = false; //shows if the player has gotten blackjack
  let hitOrStand="H"; // initial value is 'H' to start the while loop
  let canDouble = false; //inital value for if the hand is eligible to double is false
  let bet; //initalize the value of the 

  while(isNaN(bet)==true)
    {
      bet=+prompt("How much do you want to bet? If you don't put anything in, it will automatically bet $0\nMoney: $" + money);
      if(isNaN(bet)==false)
      {
        break;
      }
      else
      {
       alert("You did not enter a valid number, please enter the amount you want to bet!")
      }
    }
  

  while(bet>money)
    {
      alert("You are betting more than you have. Please select a valid amount!");
      bet=+prompt("How much do you want to bet?"); 
    }

  alert("The dealer is shuffling the cards... press OK to continue");
  
  function drawCard(player) //A function is a block of code that you can execute over and over by calling on the function. You can also add parameters to the function to change the inputs. In this case, I made the parameter of which player is the card drawn to. If the value "dealer" is given when the function is called, the card will be drawn for the dealer,
  {
    number = 1+Math.round(Math.random()*12); //will get a number from 1-13 (the possible number outcomes with the inclusion of A, J, Q, K)
    suite = 1+Math.round(Math.random()*3); //will get a number from 1-4 to determine the suite (there are 4 suites: ♥, ♦, ♣, ♠)

    //The following code sets the suite of the card
    if(suite==1)
    {
      suite="♥";
    }
    else if(suite==2)
    {
      suite="♦";
    }
    else if(suite==3)
    {
      suite="♣";
    }
    else if(suite==4)
    {
      suite="♠";
    }

    //The following code sets the number of the card

    if(number==1) //if the random number chosen is 1, it converts it into an Ace and follows general Ace rules 
    {
      name = "A";
      if(dealerSum>=11||playerSum>=11)
      {
        number = 1;
      }
      else
      {
        number = 11; 
      }
    }
    
      else if(number==11) //if the random number chose is 11, it converts in into a Jack and sets its value to 10
      {
        name = "J";
        number = 10;
      }
      else if(number==12) //if the random number chose is 12, it converts in into a Queen and sets its value to 10
      {
        name = "Q";
        number = 10;
      }
      else if(number==13) //if the random number chose is 13, it converts in into a King and sets its value to 10
      {
        name = "K";
        number = 10;
      }
      else //if none of the conditions above are true, the name of the card is the same as its value
      {
        name = number;
      }
  
      if(player == "dealer") //if the dealer draws a card (decided in parameters)
      {
        dealerCards += "|‾‾‾‾‾‾‾‾‾‾|\n|  "+name+"            |\n|  " + suite + "           |\n|                |\n|___________|\n";
        dealerSum += number;
        alert("Your total is " + playerSum + " || The dealer's total is " + dealerSum + "\nThe dealer's cards are:\n"+ dealerCards);
      }
        
      else if(player == "player") //if the player draws a card (decided in parameters)
      {
        playerCards += "|‾‾‾‾‾‾‾‾‾‾|\n|  "+name+"            |\n|  " + suite + "           |\n|                |\n|___________|\n";
        playerSum += number;
        alert("Your total is " + playerSum + " || The dealer's total is " + dealerSum + "\nYour cards are:\n"+ playerCards + "\n");
      }
    }

  //Standard starting gameplay of a blackjack game (the player gets a card handed to they, then the dealer, than the player again. Then, the player has the choice of what play they want to make)
  
  drawCard("player");
  drawCard("dealer");
  drawCard("player");
  
  //DEALING WITH PLAYER DECISIONS

  if(bet*2<=money)
  {
    canDouble = true;
  }
  
  if(playerSum==21)
  {
    blackjack=true;
    alert("Blackjack!");
    hitOrStand = "S";
    bet=bet*1.5;
    money+=bet;
  }
    
  else
  {
    if(canDouble==true)
    {
      while(hitOrStand=="H"|| hitOrStand=="h"||hitOrStand=="Hit"||hitOrStand=="hit")
      {
        hitOrStand = prompt("Do you want to hit, stand, or double. Enter 'H' to hit, 'S' to stand, 'D' to double!\n\nYour total is " + playerSum + " || The dealer's total is " + dealerSum);

        if(hitOrStand=="S"|| hitOrStand=="s"||hitOrStand=="Stand"||hitOrStand=="stand")
        {
          break;
        }
        else if(hitOrStand=="H"|| hitOrStand=="h"||hitOrStand=="Hit"||hitOrStand=="hit")
        {
          drawCard("player");
          if(playerSum==21)
          {
            break;
          }
          else if(playerSum>21)
          {
            busted = true;
            alert("You busted. You lose");
            money-=bet;
            break;
          }
        }
    
        else if(hitOrStand=="D"|| hitOrStand=="d"||hitOrStand=="Double"||hitOrStand=="double")
        {
          bet=bet*2;
          alert("You decided to double, your new bet for this hand is $" + bet);
          drawCard("player");
          if(playerSum>21)
          {
            busted = true;
            alert("You busted. You lose");
            money-=bet;
            break;
          }
          else
          {
            break;
          }
        }
        else
        {
          hitOrStand = "H";
          alert("You did not enter a valid answer, please enter your decision again!");
        }
      }
    }

    else if(canDouble==false)
    {
      while(hitOrStand=="H"|| hitOrStand=="h"||hitOrStand=="Hit"||hitOrStand=="hit")
        {
          hitOrStand = prompt("Do you want to hit or stand. Enter 'H' to hit and 'S' to stand!\n\nYour total is " + playerSum + " || The dealer's total is " + dealerSum);
  
          if(hitOrStand=="S"|| hitOrStand=="s"||hitOrStand=="Stand"||hitOrStand=="stand")
          {
            break;
          }
          else if(hitOrStand=="H"|| hitOrStand=="h"||hitOrStand=="Hit"||hitOrStand=="hit")
          {
            drawCard("player");
            if(playerSum==21)
            {
              break;
            }
            else if(playerSum>21)
            {
              busted = true;
              alert("You busted. You lose");
              money-=bet;
              break;
            }
          }
          else
          {
            hitOrStand = "H";
            alert("You did not enter a valid answer, please enter your decision again!");
          }
        }
    }
  }
  
  
    // DEALING WITH DEALER DRAWING CARDS
  
    if(busted==false && blackjack==false)
    {
      do
      {
        drawCard("dealer");
      }while(dealerSum<=16);
    }
    
    // DIFFERENT OUTCOMES DEPENDING ON THE TWO SUMS
  
    if(busted==false && blackjack==false)
    {
      if(dealerSum>21)
      {
        alert("Dealer busted, you win");
        money += bet;
      }
    
      else if(dealerSum>playerSum)
      {
        alert("The dealer's sum is higher. You lose");
        money -= bet;
      }
    
      else if(dealerSum<playerSum)
      {
        alert("Your sum is higher. You Win");
        money += bet;
      }
    
      else //the only other possibility is that the player sum is equal to the dealer sum
      {
        alert("Tie. Push");
      }
      
    }
  }

playGame();


while(playAgain==1)
  {
    if(money==0)
    {
      times=+prompt("You just gambled all your money away!! Pick a number between 5 and 10");

      if(times<=10 && times>=5)
      {
        for(let i=1;i<=times;i++)
        {
          reminder+="I will never gamble my real money!!\n";
        }
        alert(reminder);
        alert("Hopefully that convinces you to never gamble your real money beause clearly you are not very good at blackjack. To play again, click the Play Again button once this alert closes.");
        break;
      }
      else
      {
        alert("You failed to enter a number in between 5 and 10, you clearly aren't the brightest of the bunch and should therefore never gamble your real money! To play again, click the Play Again button once this alert closes.");
        break;
      }
    }
    
    playAgain =+ prompt("Do you want to play again.\nEnter 1 for YES!\nEnter 2 for NO!");

    if(playAgain==1)
    {
      playGame();
    }

    else if(playAgain==2)
    {
      alert("Thank you for playing Blackjack, you ended with $" + money + ". Come back anytime! To play again, click the Play Again button once this alert closes.");
    }

    else
    {
      playAgain = 1;
      alert("Enter a valid input");
    }
  }