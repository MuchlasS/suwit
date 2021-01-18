yourScore(false);
compScore(false);
changeImage('', '');

document.getElementById('yourScore').innerHTML = yourScore(false);
document.getElementById('compScore').innerHTML = compScore(false);

function yourScore(isAdd) {
    let score = localStorage.getItem('yourScore')
    if (score === null || score === 'null') {
        score = 0;
    }

    if (isAdd) {
        score = parseInt(score);
        score++;
    }

    localStorage.setItem('yourScore', score);
    return score;
}

function compScore(isAdd) {
    let score = localStorage.getItem('compScore');
    if (score === null || score === 'null') {
        score = 0;
    }

    if (isAdd) {
        score = parseInt(score);
        score ++;
    }

    localStorage.setItem('compScore', score);
    return score;
}

function computer() {
    const comp = parseInt(Math.random() * 3 + 1);
    if (comp === 1) return 'batu';
    else if (comp === 2) return 'gunting'
    return 'kertas';
}

function getValue(value){
    const comp = computer();
    let result = 'seri';

    changeImage(value, comp);

    if(comp === value) {
        yourScore(true);
        compScore(true);
    }
    else if(comp === 'kertas') {
        value === 'gunting' ? result = 'menang' : result = 'kalah';
    } else if (comp === 'batu') {
        value === 'kertas' ? result = 'menang' : result = 'kalah';
    } else if(comp === 'gunting') {
        value === 'batu' ? result = 'menang' : result = 'kalah';
    }

    if(result === 'menang') yourScore(true);
    else if(result === 'kalah') compScore(true);

    
    alert(`Kamu ${result} | Kamu memilih : ${value} | Computer memilih : ${comp}`)
    if(compScore() === '10' || yourScore() === '10') gameOver(yourScore(), compScore());


    return window.location.reload();
}

function resetScore() {
    localStorage.clear();
    location.reload();
}

function gameOver(yourScore, compScore) {
    if(yourScore === '10') alert('Selamat Kamu telah menang!');

    if(compScore === '10') alert('Sayang sekali Kamu telah kalah :(');

    if(yourScore === '10' && compScore === '10') alert('Kamu seri melawan Computer!');

    return resetScore();
}

function changeImage(playerValue, compValue) {
    if (playerValue !== '' || compValue !== '') {
        localStorage.setItem('playerValue', playerValue);
        localStorage.setItem('compValue', compValue);
    }

    const playerAction = localStorage.getItem('playerValue') || 'batu';
    const compAction = localStorage.getItem('compValue') || 'batu';

    document.getElementById('playerAction').style.backgroundImage = `url('img/${playerAction}.png')`;
    document.getElementById('compAction').style.backgroundImage = `url('img/${compAction}.png')`;
}