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

logger.info("SUCCESS: Connection to PGSQL instance succeeded")

def lambda_handler(event, context):
    """
    This function creates a new RDS database table and writes records to it
    """
    
    sql_string = f"select dininghall, meal, fooditems from menu where date = current_date;"

    with conn.cursor() as cur:
        cur.execute(sql_string)
        conn.commit()
        
        data2d = cur.fetchall()

        json_data = {"allison": {}, "sargent": {}, "plex_east": {}, "plex_west": {}, "elder": {}}
        for data in data2d:
            dininghall = data[0]
            meal = data[1]
            fooditems = data[2]
            json_data[dininghall][meal] = fooditems
        
        return json.dumps(json_data)
