import React from 'react';

export default class MyPara extends React.Component {

    componentDidMount() {
        // Changing the state after 3 sec
        console.log('document ready  is called');
        const myarticle = document.getElementsByTagName("article")[0]
        console.log(myarticle);
        var line = 1;
        const nodes = myarticle.getElementsByTagName("p");
        console.log(nodes);
        for (const element of nodes) {
            //    nodes.forEach(element => {
            console.log('p' + line + ' ' + element.innerText);
            var hrefNode = createElementFromHTML("<a name='p" +
                line +
                "' href='#p" +
                line +
                "' style='font-size: 80%;'>[p" +
                line +
                "]</a>");
            element.prepend(hrefNode);
            line++;
        };
    }
    render() {
        console.log('MyPara component is called');
        return (
            <div>

            </div>
        );
    }
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();

    // Change this to div.childNodes to support multiple top-level nodes.
    return div.firstChild;
}