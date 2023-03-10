```mermaid
sequenceDiagram
    participant browser
    participant server
    
    browser ->> server : HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes 
    server ->> browser: HTML-code
    browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server ->> browser: main.css
    browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server ->> browser: main.js
    
    note over browser: browser starts executing js-code that requests JSON data from server

    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: [{ content: "HTML is easy", date: "2019-05-23" }, ...]

    note over browser: browser executes the event handler that renders notes to display
 
    note over browser: The user fills 'new note' in the form and clicks submit button 
    browser ->> server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/exampleapp/new_note WITH PAYLOAD [{note: "new note"}]

    
    server ->> browser: REDIRECT TO https://studies.cs.helsinki.fi/exampleapp/notes
    browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
    server ->> browser: HTML-code
    browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server ->> browser: main.css
    browser ->> server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server ->> browser: main.js
    browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: [{ content: "new note", date: "2022-12-26" }, ...]

    note over browser: browser executes the event handler that renders notes to display
 
```
