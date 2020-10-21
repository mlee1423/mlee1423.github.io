let usertexts = [];
//example {UserTerminal: 'education'}

let guestinput = document.getElementById('userinputtest').value;
let paragraph = document.getElementById('terminalintrotext');

if (guestinput == 'education'){
    paragraph = paragraph.textContent += "This just got added.";
}

const jsTerminal = (ev) => {
    ev.preventDefault(); //to stop form submission
    let usertext = {
        userinput: document.getElementById('userinputtest').value
    }
    usertexts.push(usertext);
    let guestinput = document.getElementById('userinputtest').value;
    let paragraph = document.getElementById('terminalintrotext');

    if (guestinput == 'education'){
        paragraph = paragraph.innerHTML += " education <br> +------------------------------------+-----------------------+------------------------+------+<br>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;University&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Degree&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Discipline&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Year |<br>+------------------------------------+-----------------------+------------------------+------+<br>| University of Texas at San Antonio | Bachelor's of Science | &nbsp;Computer Engineering&nbsp; | 2016 |<br>| University of Texas at San Antonio | Bachelor's of Science | Electrical Engineering | 2016 |<br>+------------------------------------+-----------------------+------------------------+------+ <br><br> C:&#92;Users&#92;Guest>";
    }
    if (guestinput == 'experience'){
        paragraph = paragraph.innerHTML += " experience <br> +----------------------------+----------------------------+---------------------+<br>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Title&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Company&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Duration&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>+----------------------------+----------------------------+---------------------+<br>| Controls Specialist&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| JMP Solutions&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;| Nov 2018 - Apr 2020 |<br>| System Developer Associate | Accenture Federal Services | Apr 2017 - Oct 2018 |<br>+----------------------------+----------------------------+---------------------+ <br><br> C:&#92;Users&#92;Guest>";
    }
    if (guestinput == 'skills'){
        paragraph = paragraph.innerHTML += " skills <br> +------------+------------+<br>|&nbsp;&nbsp;Language&nbsp;&nbsp;|&nbsp;Proficency&nbsp;|<br>+------------+------------+<br>|&nbsp;JavaScript&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;****_&nbsp;&nbsp;&nbsp;|<br>|&nbsp;&nbsp;HTML/CSS&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;****_&nbsp;&nbsp;&nbsp;|<br>|&nbsp;&nbsp;&nbsp;&nbsp;SQL&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;****_&nbsp;&nbsp;&nbsp;|<br>|&nbsp;&nbsp;&nbsp;&nbsp;PHP&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;***__&nbsp;&nbsp;&nbsp;|<br>|&nbsp;&nbsp;&nbsp;&nbsp;C#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;***__&nbsp;&nbsp;&nbsp;|<br>+------------+------------+<br><br> C:&#92;Users&#92;Guest>";
    }
    if (guestinput == 'help'){
        paragraph = paragraph.innerHTML += " help <br> The following commands are available: <br><br> Commands in this context:<br> education&nbsp;&nbsp;&nbsp;- shows a list of degrees<br> experience&nbsp;&nbsp;- shows a table of prior work experience<br>skills&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- shows a table of profiency in different Front End Web Dev Languages<br><br>C:&#92;Users&#92;Guest>"
    }
    else {
        paragraph = paragraph.innerHTML += " "+guestinput+"<br> '"+guestinput+"' is not recognized as an internal or external command, <br> operable program or batch file.<br><br> Type 'help' for more options. <br><br> C:&#92;Users&#92;Guest>";
    }
    document.forms[0].reset(); //to clear the form for next entries
    //document.querySelector('form').reset()

    //saving to localStorage
    localStorage.setItem('UserTerminal', JSON.stringify(usertexts));

    //terminal height check
    let hcheck = document.getElementById('underscore').scrollHeight.value;
    let yscroll = document.getElementById('profile-text');
    
    if (hcheck >=400){
        yscroll.classList.add("hcheck");
    }
}
document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('guestsubmit').addEventListener('click', jsTerminal);
});


