Pantheon &hearts; Automation Workflow
===

I use Pantheon [at work](http://teamcolab.com/) and I find myself having to do a lot of manual syncing between different environments. Because of this, I made node cli-tooling based off of [migrating instructions I found here](https://pantheon.io/blog/importing-large-wordpress-sites-pantheon).

### This project is still very much a work in progress.

To get started, just run `npm install` & run the main binary from `./bin/paw`:

##### commands

```sh
❯ ./bin/paw media up project_name
❯ ./bin/paw media down project_name
❯ # ./bin/paw db <direction> project_name
❯ # ./bin/paw sync <direction> project_name # do both db + media
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

Try putting a Pantheon project into the local .pantheonrc file and run `./bin/paw media <direction> <project>`.
