
📋 The IDE Agent Prompt
Copy and paste this directly into your IDE's chat/agent window:
> "Act as my deployment assistant. I have a web-based interactive SVG application ready for deployment. My primary file is index.html. Please execute the following workflow using Git and the GitHub CLI (gh) available in this environment:
>  * Initialize & Commit: Initialize a Git repository in this directory (if not already done), stage all files, and create a commit with the message 'Initial commit: Voice Leading Fretboard MVP'.
>  * Create Repository: Use the GitHub CLI to create a new public repository on my connected GitHub account named voice-leading-fretboard.
>  * Push Code: Push the local main branch to the new remote repository.
>  * Deploy to Pages: Configure and enable GitHub Pages for this repository to serve from the root of the main branch.
>  * Provide Link: Once complete, print the live GitHub Pages URL to the console so I can open it and preview the app."
> 
What the Agent Will Actually Do Behind the Scenes
When you feed that prompt to your IDE, it will execute a sequence of terminal commands on your behalf. Here is the logic it follows:
 * Version Control: It runs git init, git add ., and git commit to safely snapshot your work.
 * Remote Creation: It uses gh repo create to bypass the need for you to open a browser, log into GitHub, and manually click "New Repository."
 * The Hosting Magic: It pushes the code and triggers GitHub's built-in static hosting.
Note: GitHub Pages can sometimes take 60 to 90 seconds to build the very first time. If you click the link and see a 404 error, just refresh a minute later.
