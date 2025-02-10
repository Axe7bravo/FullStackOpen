sequenceDiagram
    participant browser
    participant server

   
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
        Note right of browser: The browser starts executing the JavaScript code <br> it fetched from the server to render the new note.


    server-->>browser: 201 created
    deactivate server

    Note left of server: The server responds with a status code. 
