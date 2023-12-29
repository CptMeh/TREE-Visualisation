# TREE-Visualisation
A visualisation applet in form of an interactive map of switzerland for the TREE study. 

# Running the Applet
During developement a local server was created with Node.js' http-server. If there is an issue with running the applet, try the following:

## Linux:
1. Install Node.js, npm and http-server:  
     $ sudo apt install nodejs  
     $ sudo apt install npm  
     $ sudo npm install -g http-server  
   
2. Go to the project folder and open it in terminal

3. Run the following command:  
     $ http-server -p 8000  
  
   This will run the index.html file on a local server on port 8000.

## Windows:
**First install Node.js**:
1. Download Node.js: Go to the official Node.js website and download the installer for Windows. Choose the "LTS" version for the most stable and supported version:
    'https://nodejs.org/en'
    
2. Run the Installer: Execute the downloaded file and follow the installation prompts. This will install both Node.js and npm (Node Package Manager) on your system.

3. Verify Installation: After installation, open a command prompt (you can search for cmd in the Start menu) and run the following commands to check if Node.js and npm were installed successfully:  
    node --version  
    npm --version  

**Secondly install http-server**:
Open a Command Prompt and tpye the command:  
    npm install -g http-server

**Start the http-server:**
1. Go to the project folder:  
    cd path\to\your\project  

2. Start the Server: Run the following command to start the server on port 8000:  
    http-server -p 8000  

3. Access Your Project: Open your preferred web browser and go to http://localhost:8000. You should now see the project served by http-server.  


