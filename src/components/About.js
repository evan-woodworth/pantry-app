import React from 'react';

const About = () => {
    return (
        <div>
            <h1>We Are ReciPantry!</h1>
            <h2>Effortless Grocery Management</h2>
            <h4>The only application you will need to organize all of your food preparation.</h4>
            <p>With ReciPantry you can: </p>
            <ul>
                <li>Get inspiration with recipes for meals you would like to prepare</li>
                <li>Track the foods you currently have in your pantry at home</li>
                <li>Discover recipes you can cook with the ingredients already in your house</li>
                <li>Create your own custom recipes alongside the ones provided by the application</li>
                <li>Generate a shopping list you can take with you based on the ingredients you don't have and the recipes you want to cook</li>
            </ul>
            <h3>The Team</h3>
            <div className="teamContainer">
                <div className="teamCard">
                        <p className="teamTitle">Evan Woodworth</p>
                        <a href="https://linkedin.com/in/evan-woodworth">LinkedIn</a>
                        <img src="https://media-exp3.licdn.com/dms/image/D5635AQFVazJGt9Y3uA/profile-framedphoto-shrink_200_200/0/1623166739346?e=1623967200&v=beta&t=nZ45topzwu9ItDiZ840ZwUBuCJ47zn0DeGjQfK6yx70" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">Jesse Jensen</p>
                        <a href="">LinkedIn</a>
                        <img src="https://ca.slack-edge.com/T0351JZQ0-U01T4BRQ63C-a0b4f4cee07c-512" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">Paul Knick</p>
                        <a href="linkedin.com/in/paul-knick-21417346">LinkedIn</a>
                        <img src="https://media-exp3.licdn.com/dms/image/C5603AQFUNZmBnOM2Vw/profile-displayphoto-shrink_200_200/0/1517423619719?e=1629331200&v=beta&t=2F3ZRXnE5bX5gVB5705WIpBpVTMRe6crzqUhKdp_x-I" alt="profile picture" />
                </div>
                <div className="teamCard">
                        <p className="teamTitle">Thomas Duong</p>
                        <a href="">LinkedIn</a>
                        <img src="https://ca.slack-edge.com/T0351JZQ0-U01R17BAV9P-718ee2b11770-512" alt="profile picture" />
                </div>
            </div>

        </div>
    )
}

export default About;