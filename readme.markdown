Pantheon &hearts; Automation Workflow
===

I use Pantheon [at work](http://teamcolab.com/) and I find myself having to do a lot of manual syncing between different environments. Because of this, I made these helpful little bash scripts based off of [migrating instructions I found here](https://pantheon.io/blog/importing-large-wordpress-sites-pantheon).

### This project is still very much a work in progress.

To get started, just run `npm install` & run the main binary from `./bin/paw`:

##### commands

```sh
❯ ./bin/paw db -p project_name
❯ ./bin/paw media -p project_name
❯ ./bin/paw sync -p project_name # do both db + sync
❯ # go forth & prosper
```

##### preferences

Setup a .pantheonrc in your $HOME directory or in the current directory. The structure of the file should be valid JSON in this format:

```json
{
  "project_name": {
    "uuid": "4cc6-eec512c3-a57d-0267788fabbc-97bb",
    "db": "wordpress_project_name",
    "env": "dev",
    "root": "$HOME/Developer/vvv/www/project_name/htdocs/"
  }
}
```
