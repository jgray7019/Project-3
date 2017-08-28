$(function() {

    // List of Categories
    var thingsArray = ['Stuff you wouldn\'t say to your Grandma', 'Stuff you wish you didn\'t like', 'Stuff you ate as a child', 'Stuff dogs are actually saying when they bark', 'Stuff not to do while driving!!', 'Stuff that is harder than it looks', 'Stuff people do when no one is looking', 'Stuff you don\'t want to happen at a family gathering', 'Stuff not to do if you\'re on a boat', `Stuff that you should not do in an elevator`, `Stuff that you shouldn\'t bring into the bathtub`, `Stuff that you would\'t want to be allergic to`, `Stuff you wouldn\'t do for a million dollars`, `Stuff you would like to add to the 10 Commandments`, `Stuff you shouldn\'t shout at the top of your lungs`, `Stuff you shouldn\'t hold while riding a bike`, `Stuff you can do to get rid of unwanted guests`, ``]

    // random Item from Category
    var ranNum = Math.floor(Math.random() * thingsArray.length);

    $('.arrowIcon').on('click', function(e) {
        e.preventDefault;

        $('html,body').animate({
             scrollTop: $(".submitPage").offset().top},
             'slow');

    });
    // prints Category to DOM on button press
    $('form.thingButton').on('submit', function(e) {
        e.preventDefault();
        $('.category').html(`<p class="animated fadeIn">${thingsArray[Math.floor(Math.random() * thingsArray.length)]}</p>`);
    });

    // define empty arrays (global scope)
    var playerList = [];
    var answerList = [];

    // Takes values of player Name and Answer and adds them to global scope Arrays
    $('.submitAnswer').on('submit', function(e) {
        e.preventDefault();
        var playerName = $(this).find('input[name="playerName"]').val();
        playerList.push(playerName);
        var playerAnswer = $(this).find('input[name="playerAnswer"]').val();
        answerList.push({
            playerChoice: playerAnswer,
            playerName: playerName,
        });
        // Disables button after 1 submit
        $(this).find('input[type="submit"]').prop('disabled', true);
    });

    // on "playNow" Click....
    $('button.playNow').on('click', function(e) {
        e.preventDefault();

        sweetAlert({
            title: 'Match a player with their answer',
            text: 'If you guess correctly, keep guessing!'
            // confirmButtonColor: '$blue'
        });

        $('html,body').animate({
             scrollTop: $(".matchPage").offset().top},
             'slow');

        $('.players').append(`<h3 class=mobileTitle>Players</h3>`)
        $('.answers').append(`<h3 class=mobileTitle>Answers</h3>`)
        //1.  Sorts Answers Array Alphabetically
        var newAnswers = answerList.sort(function(a, b) {    
            var nameA = a.playerChoice;
            var nameB = b.playerChoice;    
            if (nameA < nameB) {
                return -1    
            } else if (nameA > nameB) {        
                return 1    
            } return 0

        });

        // 2. Appends Input (radio) and label (string) of playerList
        console.log(newAnswers)
        playerList.forEach(function(player, index) {

        $('.players').append(`<div><input type="radio"  data-index="${index}" name="player" id="${player}" value="${player}"><label  for="${player}">${player}</label></div>`);
        });

        // 2. Appends Input (radio) and label (string) of newAnswers (sorted)
        newAnswers.forEach(function(answer, index) {
            $('.answers').append(`<div><input type="radio" data-index="${index}" name="answer" id="${index}" value="${answer.playerName}"><label maxlength='50' for="${index}">${answer.playerChoice} </label></div>`)
        });
        // 3. Disables "playNow" button after 1 click.
        $(this).prop('disabled', true);
        //  4. Submit button is appended to the page along with the Player and Answer Lists
        $('.submitGuessContainer').append(`<input class="submitGuess" type="submit" value="submit guess">`)
    });

    // on Submit Guess button
    $('.guessForm').on('submit', function(e) {
        e.preventDefault();

        // stores variables of checked radio buttons
        var playerChecked = $('input[name=answer]:checked').val();
        var playerNameChecked = $('input[name=player]:checked').val();

        // gets index value of checked radio button
        var playerCheckedIndex = $('input[name=answer]:checked').data('index');

        // gets DOM array for winner countdown
        var playersArr = $('.players div');

        // Checks for Match between player array and answer array
        // if match:
            // a. print 'Correct! Guess Again!''
            // b. remove matched player and answer from PlayerArr
        // if not a match:
            // a. print 'Nice Try! Next Player's turn'
        if (playerChecked === playerNameChecked) {
            sweetAlert({
                title: 'Correct!',
                text: 'You get another guess.',
                type: 'success',
                allowEscapeKey: 'true',
                showConfirmButton: true
            });
            $('input[name=answer]:checked').parent().remove();
            $('input[name=player]:checked').parent().remove();
        } else if (playerNameChecked !== playerChecked) {
            sweetAlert({
                 title: 'Nice Try',
                 text: 'Next Player\'s Turn.',
                 type: 'error',
                 allowEscapeKey: 'true',
                 showConfirmButton: true
            });
        }
        
        // When there is only two items left in array (1 player, 1 answer) print "you win the game!"
        if (playersArr.length == 2 && playerChecked === playerNameChecked) {
            sweetAlert({
                title: '😎',
                text: 'You Mastered the Stuff!',
                allowEscapeKey: 'true',
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Play Again?",
                closeOnConfirm: false
            },
                function(){
                      window.location.reload(true)
                      window.scrollTo(0, 0);
                });
        }
    });
});

