import React from 'react';
import Tweet from './Tweet';

const TweetList = () => {
    const tweets = [
        "Første 🚓 er fremme på stedet. De ser ingen røyk, men det lukter noe svidd etter mulig matlaging. De har kontakt med beboer i huset.",
        "En 🚗 fjernet fra stedet. Viste seg at det ikke var personskade. 👮 oppretter sak på forholdet",
        "#Asker Bondibrua. 🚑 🚒 🚓 er på stedet ifm kollisjon mellom to 🚗. En person undersøkes i 🚑. Ukjent skadeomgang. 🚗berging er på vei for å fjerne en 🚗."
    ]
  
    let tweetsOutput = tweets.map(tweet =>
        <Tweet text={tweet} />
    );

    return (
        <div>
            {tweetsOutput}
        </div>
    );
}

export default TweetList;