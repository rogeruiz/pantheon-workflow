Pantheon &hearts; Automation Workflow
===

I use Pantheon [at work](http://teamcolab.com/) and I find myself having to do a lot of manual syncing between different environments. Because of this, I made these helpful little bash scripts based off of [migrating instructions I found here](https://pantheon.io/blog/importing-large-wordpress-sites-pantheon).

### This project is still very much a work in progress.

Currently, I'm tackling three problems I see come up really often.

* Dumping local databases
* Migrating URLs in local databases to pantheon environments
* Syncing wp-content/uploads

```sh
# Using dump-local-db
./bin/fetch-db $DEV_DB_NAME

# Using replace-urls
./bin/replace-urls $LOCAL_DEV_URL $PANTHEON_DEV_URL $SQL_FILE_NAME

# Using sync-uploads
./bin/sync-uploads $PATH_TO_WP_UPLOADS $DIRECTION $PANTHEON_ENV $PANTHEON_UUID
```
