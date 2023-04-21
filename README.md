<br><h1 align="center">ZipRecruiter 1-Click Filter:sparkles:</h1> 

#### <p align="center">An efficient tool to optimize your job search on ZipRecruiter by only displaying 1-Click Apply jobs. </p>


This is a JavaScript program that eliminates jobs that redirect you to external websites. It adds a button on the search results page that enables you to conceal these jobs and concentrate on the most suitable and convenient opportunities for your career objectives. 

Please read the Disclaimer and License below carefully! 😊

<p align="center"><img src="https://user-images.githubusercontent.com/105183376/233206431-08e4c647-565a-4688-81fb-eb9ccb8a5dbf.png?raw=true" alt="'additional features - search by minimum qualification grade and exclude key words from job titles" width="50%"></p>

## How to use it

- To use this script, you need to install a browser extension that allows you to run custom JavaScript code on any website. Some examples are Tampermonkey, Greasemonkey, or Violentmonkey.
- After installing the extension, create a new script and copy the code from this repository into it. Save and activate the script.
- Now, when you go to a ZipRecruiter job search results page, you will see a new button that says "1-Click Filter".
- Enjoy applying for jobs faster and easier!


You can further customize your job search by utilizing the InputBox by adding keywords that you want to filter out based on your job title preferences. For example, if you are looking for a developer job and you don't want to see sales or telesales jobs, you can type those words in the InputBox and they will be excluded from your search after you click enter!


<p align="center"><img src="https://user-images.githubusercontent.com/105183376/233176312-e2211387-45a9-45e0-a7eb-c197bc255ffe.png?raw=true" alt="'type Sales, Telesales' in the input box to exclude those words" width="60%"></p>


## Known Issues/Limitations

- Some jobs that appear to be '1-Click Apply' may require you to answer additional questions before your application is submitted. This script does not exclude these jobs from the results. 
  - To avoid jobs that ask questions, you could use ublock to block the following element: `www.ziprecruiter.com##.ScreenModalOverlay`
- Some employers may send you an email after you have clicked '1-Click Apply' asking you to visit an external website to 'complete your application'. This script is unable to identify these employers in advance.


## Contributing

Thank you for your interest in this project. I welcome any suggestions, feedback, or bug reports from the community. You can reach me by email at github_user@tuta.io or simply open an issue or a pull request.


## Disclaimer

This script is provided "as is" and with no warranty or guarantee of any kind, either express or implied, including but not limited to the accuracy, completeness, reliability, suitability, or availability of the script. This script is intended for personal learning and research purposes only and should not be used for any other purpose that may violate ZipRecruiter's terms of service, privacy policy, or other policies. I am not affiliated with or endorsed by ZipRecruiter in any way and I do not assume any responsibility or liability for any consequences or damages that may arise from using this script. Please refer to the attached GNU General Public License v3.0 documentation for more details on the license and permissions of this script.


## License
```
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
```
