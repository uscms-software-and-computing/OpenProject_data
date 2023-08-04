const core = require('@actions/core');
const github = require('@actions/github');
import { Headers } from 'headers-utils'
import fetch from 'node-fetch';


try {
    let myHeaders = new Headers();
    const opToken = core.getInput('OPEN_PROJECT_ID');
    let authString = 'apikey' + ":" + opToken;
    
    myHeaders.append('Authorization', "Basic " + btoa(authString));
    myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:63343');
    // myHeaders.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT")

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    let url = 'https://openproject-test.k8s.accre.vanderbilt.edu';
    let query = '/api/v3/work_packages?columns%5B%5D=id&columns%5B%5D=project&columns%5B%5D=customField1&columns%5B%5D=category&columns%5B%5D=subject&columns%5B%5D=type&columns%5B%5D=status&columns%5B%5D=startDate&columns%5B%5D=dueDate&filters=%5B%7B%22project%22%3A%7B%22operator%22%3A%22%3D%22%2C%22values%22%3A%5B%224%22%2C%225%22%2C%226%22%2C%228%22%2C%2235%22%5D%7D%7D%2C%7B%22type%22%3A%7B%22operator%22%3A%22%3D%22%2C%22values%22%3A%5B%223%22%2C%221%22%2C%222%22%5D%7D%7D%2C%7B%22dueDate%22%3A%7B%22operator%22%3A%22%3C%3Ed%22%2C%22values%22%3A%5B%222023-06-30%22%2C%222023-10-01%22%5D%7D%7D%2C%7B%22customField2%22%3A%7B%22operator%22%3A%22%3D%22%2C%22values%22%3A%5B%22f%22%5D%7D%7D%5D&includeSubprojects=false&offset=1&pageSize=1000&showHierarchies=true&showSums=false&sortBy=%5B%5B%22id%22%2C%22asc%22%5D%5D';
    // fetch("https://openproject-test.k8s.accre.vanderbilt.edu/api/v3/queries/47", requestOptions)
    fetch(url + query, requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));

    const nameToGreet = core.getInput('who-to-greet');
    console.log(`Hello ${nameToGreet}`);

    const time = new Date().toTimeString();

    core.setOutput('time', time);
    const payload = JSON.stringify(github.context.payload, undefined, 2);

    console.log(`The event payload: ${payload}`);
    } catch (error) {
    core.setFailed(error.message);
    }