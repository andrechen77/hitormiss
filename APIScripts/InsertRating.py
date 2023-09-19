import sys
import logging
import psycopg2
import json

# rds settings
# information redacted for github
rds_host  = ""
user_name = ""
password = ""
db_name = ""

logger = logging.getLogger()
logger.setLevel(logging.INFO)

# create the database connection outside of the handler to allow connections to be
# re-used by subsequent function invocations.
try:
    conn = psycopg2.connect(
    host=rds_host,
    database=db_name,
    user=user_name,
    password=password)
    
except Exception as e:
    logger.error("ERROR: Unexpected error: Could not connect to PGSQL instance.")
    logger.error(e)
    sys.exit()

logger.info("SUCCESS: Connection to RDS MySQL instance succeeded")

def lambda_handler(event, context):
    """
    This function creates a new RDS database table and writes records to it
    """

    data = json.loads(event['body'])
    rating = data['rating']
    undercooked = data['undercooked']
    tweet = data['tweet']
    dininghall = data['dininghall']
    
    sql_string = f"insert into ratings (dininghall, rating, undercooked, tweet) values('{dininghall}', {rating}, {undercooked}, '{tweet}')"

    with conn.cursor() as cur:
        cur.execute(sql_string)
        conn.commit()
        

    return "successfully inserted in table"

    
    
