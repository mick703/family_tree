# family_tree

## Install and set up
1. Download the code 
```bash
git clone git@github.com:mick703/family_tree.git
```
2. Go the directory and install packages. Assuming you are using yarn, but you can also use npm.
```bash
yarn install
```
3. Build and run the app
```bash
yarn build
yarn start
```
4. Use ADD_CHILD, GET_RELATIONSHIP to interact with the app. Please make sure you pass the correct parameters as it validates the inputs case sensitive.
5. Use QUIT command to exit the app.


## Run scripts
| command        | description   | 
| ------------- |-------------| 
| yarn build    | Transpile ts files into js in /dist | 
| yarn start    | Run the js app from /dist      |
| yarn dev | Run development environment wtih nodemon      | 
| yarn test | Run tests with Jest in watch mode      | 
| yarn lint | Run eslint      | 
| yarn coverage | Run jest with codecovrage      | 


## Known limitations
- All members have to unique names. Naming multiple members with the same name will cause errors.
- All members have to use single word names. Multi-word names will causes issues with passing correct input parameters. 
Due to this limitation, King Arthur and Queen Margret have been named as Arthur and Margret in the famility tree when it initialized. 
- All commands and parameters are case sensitive. Please check constants/commands.ts and constants/relationships.ts for valid commands and argeuments. 


