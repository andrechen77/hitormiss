# Dine-on-campus webscraper and postgresql uploader
# Made by Nathan Hendrickson for WildHacks 2023

import os
import psycopg2
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

load_dotenv()
HOST_URL = os.getenv("HOST_URL")
DATABASE_NAME = os.getenv("DATABASE_NAME")
USERNAME = os.getenv("DB_USERNAME")
PASSWORD = os.getenv("DB_PASSWORD")

def get_menu_items(_wait=2):
    # Wait for page to load
    driver.implicitly_wait(2)

    # Wait for the object to be created
    items = WebDriverWait(driver, 10).until(
        EC.presence_of_all_elements_located((By.CLASS_NAME, "menu-item"))
    )
    menu = "['"+"', '".join([item.text.replace("'", "''") for item in items])
    return menu[:-2]+ "']"

def click_button_name(name):
    # Find the button and click it
    try:
        button = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.LINK_TEXT, name))
        )
        button.click()
        return True
    except:
        return False

def get_hall_menu(xpath, _wait=1):
    # navigates to dining hall of given xpath
    dropdown = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "dropdown-grouped__BV_toggle_"))
    )
    dropdown.click()
    # Wait for menu to pop up
    driver.implicitly_wait(_wait)
    dining_halls = driver.find_element(By.XPATH, xpath)
    dining_halls.click()

    menu_string = [[], [], []]
    if click_button_name("Breakfast"):
        menu_string[0] = get_menu_items(_wait=5)
    if click_button_name("Lunch"):
        menu_string[1] = get_menu_items()
    if click_button_name("Dinner"):
        menu_string[2] = get_menu_items()

    return menu_string

# --------------------
# ------- MAIN -------
# --------------------

#
# ----- SELENIUM -----
#

# Set up the webdriver
driver = webdriver.Chrome()

# Visit the webpage
url = "https://dineoncampus.com/northwestern/whats-on-the-menu"
driver.get(url)

# Allison Menu
menus = []
for i in range(1, 6):
    menus.append(get_hall_menu("//*[@id=\"building_6113ef5ae82971150a5bf8ba\"]/li["+str(i)+"]/button"))

# Close the webdriver
driver.quit()

#
# ----- POSTGRES -----
#

# Connection Creation
conn = psycopg2.connect(
    host=HOST_URL,
    database=DATABASE_NAME,
    user=USERNAME,
    password=PASSWORD
)

# Cursor Creation
cur = conn.cursor()

# Dining hall and Meal Arrays
dining_halls = ["allison", "sargent", "plex_west", "plex_east", "elder"]
meal_types = ["breakfast", "lunch", "dinner"]

# Insert rows
for (el, menu) in enumerate(menus):
    for (el2, meal) in enumerate(menu):
        postgres_query = f" INSERT INTO menu (date, dininghall, meal, fooditems) VALUES (DATE(timezone('CDT', NOW())), '{dining_halls[el]}', '{meal_types[el2]}', ARRAY{meal}::text[]); "
        cur.execute(postgres_query)

# Commit Changes
conn.commit()

# Close Cursor and Connection
cur.close()
conn.close()