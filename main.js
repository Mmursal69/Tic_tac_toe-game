const button_data = document.querySelectorAll('.grid');
const sentence = document.querySelector('p');
const start_button = document.querySelector('.Start_btn');
const player_name_1_full = document.querySelector('.Player_1');
const player_name_2_full = document.querySelector('.Player_2');
var fliper_bool = null;
var reset_game = null;
var no_turns = 1;
var player_1_name;
var player_2_name;
const winning_condition = [
    [0,1,2], 
    [3,4,5],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,7,8]
]

start_button.addEventListener(('click'), (e) =>{
    e.preventDefault();
    if(reset_game === true){
        game_reset();
        start_button.textContent = 'start game !!!';
        start_button.style.color = 'black';
        fliper_bool = null;
        reset_game = null;

    }else
    {
        player_1_name = player_name_1_full.value;
        player_2_name = player_name_2_full.value;
        fliper_bool = true;
        reset_game = true;
        sentence.innerHTML = `Game Start. ${player_1_name}'s turn !`;
        start_button.textContent = 'Restart / Reset game ?';
        start_button.style.color = 'red';
    }
})

button_data.forEach((buttons) => {
    buttons.addEventListener(('click'), ()=> {
        when_Button_pressed(buttons,sentence,fliper_bool);
        winner_check(button_data);
    });
});


function when_Button_pressed(but,sent){
    if(fliper_bool === true && but.textContent !== 'O' && but.textContent !== 'X'){
        but.textContent = 'X';
        fliper_bool = false
        but.style.color = 'red';
        sent.innerHTML = `${player_1_name} has made a Move. Now turn for <b>${player_2_name}</b>`;
        sent.style.color = 'blue';
        
    }
    else if(fliper_bool === false && but.textContent !== 'X' && but.textContent !== 'O' ) {
        but.textContent = 'O';
        fliper_bool = true;
        but.style.color = 'blue';
        sent.innerHTML = `${player_2_name} has made a Move. Now turn for <b>${player_1_name}</b>`;
        sent.style.color = 'red';

    }

}

function winner_check(buttons_passed){
    for (var i =0; i <winning_condition.length; i++ ){
        const x = winning_condition[i][0];
        const y = winning_condition[i][1];
        const z = winning_condition[i][2];

        if(buttons_passed[x].textContent === 'X' && buttons_passed[y].textContent === 'X' && buttons_passed[z].textContent === 'X'){
            sentence.innerHTML = `${player_1_name} is the <b>Winner !!! </b>`;
            sentence.style.color = 'green';
            fliper_bool = null;
        }
        else if (buttons_passed[x].textContent === 'O' && buttons_passed[y].textContent === 'O' && buttons_passed[z].textContent === 'O'){
            sentence.innerHTML = ` ${player_2_name} is the <b>Winner !!!</b>`;
            sentence.style.color = 'green';
            fliper_bool = null
        }
    }
}

function game_reset(){
    button_data.forEach((buttons_dat) => {
        buttons_dat.textContent = null;
    })
}