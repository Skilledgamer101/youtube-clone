# youtube-clone
YouTube clone application using TypeScript, Next.js, Express.js, Docker, FFmpeg, Firebase Auth, Firebase Functions, Firebase Firestore, Google Cloud Storage, Google Cloud Pub/Sub, Google Cloud Run

<a id="readme-top"></a>

<div align="center">

<h3 align="center">YouTube Clone</h3>

  <p align="center">
    A video uploading and streaming service similar to YouTube.
    <br />
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#additional-steps">Additional Steps</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

![Kiosk Homepage Screen Shot][homepage-screenshot]
This project mimics core features present in video streaming websites. It allows users to sign in via Google, upload videos, and view uploaded videos. I primarily built it as a learning experience for full stack app development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* [![Next][Next.js]][Next-url]
* [![React][React.js]][React-url]
* [![TypeScript][TypeScript]][TypeScript-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

Requirements:
1. Windows 11 PC
2. An account with Administrative access on the PC

### Prerequisites

Some packages need to be installed first.

Open PowerShell as an *Administrator*.

* PowerShell
  ```PowerShell
  Set-ExecutionPolicy -ExecutionPolicy Unrestricted
  Install-PackageProvider -Name NuGet -Force
  Install-Module -Name GCDialog -Force -Scope AllUsers
  ```

### Installation

1. Clone the repo:

* Command Prompt
   ```sh
   git clone https://github.com/Skilledgamer101/uts-sd-kiosk.git
   ```
2. Run the following command under *Administrator* Command Prompt:

* Command Prompt
   ```sh
   cd path\to\cloned\repo
   psexec.exe -i -s powershell.exe
   ```
3. Click 'Accept' in the popup window.

> Note: Before performing the next step, take a look at the `setup_kiosk.ps1` file in this repo. Make sure the paths match with the ones on your PC, and feel free to add/remove any paths.

4. A new window should open titled 'PsExec.exe'. Enter the following commands in it:

* PowerShell
  ```PowerShell
  cd uts-sd-kiosk
  .\setup_kiosk.ps1
   ```

5. You should receive a message like this:
  ```
  Successfully applied Assigned Access Configuration.
  ```

> Note: For the next step, you will have to change the "Arguments" tag (at the very bottom) in the `Clear Everything.xml` file to point to the path of the `clear_everything.ps1` file in this repo.

6. Set the `clear_everything.ps1` file to run in the background:
  * PowerShell
  ```PowerShell
  Register-ScheduledTask -Xml (Get-Content -Path "C:\path\to\task.xml" -Raw) -TaskName "Clear Everything"
  ```
> Note: The Task Scheduler application can be used to set the task as well ('Import Task' > Select the `Clear Everything.xml` file).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ADDITIONAL STEPS FOR EXTRA SECURITY-->
## Additional Steps
1. Modify Edge and Chrome shortcuts to make them open in Private mode by default:
  * PowerShell
  ```PowerShell
  .\UpdateShortcut.ps1 -ShortcutPath "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Microsoft Edge.lnk" -NewTargetPath "C:\path\to\msedge.exe" -Arguments "https://uts.mcmaster.ca --inprivate"
  .\UpdateShortcut.ps1 -ShortcutPath "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Google Chrome.lnk" -NewTargetPath "C:\path\to\chrome.exe" -Arguments "https://uts.mcmaster.ca --incognito"
  ```
2. Create new File Explorer shortcut in Start Menu
  * PowerShell
  ```PowerShell
  .\UpdateShortcut.ps1 -ShortcutPath "C:\ProgramData\Microsoft\Windows\Start Menu\Programs\explorer.lnk" -NewTargetPath "%WINDIR%\explorer.exe"
  ```
3. Restrict access to hard drive <br /> <br />
  a. Press Win + R. Type mmc. <br />
  b. File > Add/Remove Snap-In > Group Policy Object Editor > Browse > kioskUser0 > Finish <br />
  c. User Configuration > Administrative Templates > Windows Components > File Explorer > Prevent access to drives from My Computer <br />
  d. Select whichever drives you would like to restrict access to <br />
  e. User Configuration > Administrative Templates > Windows Components > File Explorer > Prevent users from adding files to the root of their User Folder <br />
  f. Select 'Enabled'

4. (Optional) Set Shared Computer Activation for Microsoft Office products.
* Command Prompt
```sh
reg add "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Office\ClickToRun\Configuration" /v SharedComputerLicensing /t REG_SZ /d "1" /f
```

<!-- USAGE EXAMPLES -->
## Usage

### Specific Allowed Apps on Homepage
![Kiosk Apps Screen Shot][apps-screenshot]

### Scheduled Data Clearing
![Restart Screen Shot][restart-screenshot]

### Trying to Access A File in Hard Drive
![File Explorer Screen Shot][explorer-screenshot]

### Trying to Access an App Not on Allowed List
![Blocked App Screen Shot][blocked-app-screenshot]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Mansoor Lunawadi - mansoorlunawadi@yahoo.ca

Project Link: [https://github.com/Skilledgamer101/uts-sd-kiosk](https://github.com/Skilledgamer101/uts-sd-kiosk)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [GCDialog](https://github.com/grantcarthew/ps-gcpowershell) <br />
GCDialog was used to display a countdown timer dialog in the `clear_everything.ps1` file.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[TypeScript]: https://shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=FFF
[TypeScript-url]: https://www.typescriptlang.org/
[homepage-screenshot]: images/homepage.png
[apps-screenshot]: images/apps.png
[explorer-screenshot]: images/explorer.png
[blocked-app-screenshot]: images/blocked-app.png
[restart-screenshot]: images/restart.png
