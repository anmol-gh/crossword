import random
import requests
import selenium
import bs4
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from time import sleep
driver = webdriver.Edge()
driver.get("https://crosswordy.vercel.app/")

# API Used
# https://random-word-api.herokuapp.com/home

textbox = driver.find_element(By.CLASS_NAME, "body-input")
addword_btn = driver.find_element(By.CLASS_NAME, "body-btn")
createcrossword_btn = driver.find_element(By.CLASS_NAME, "body-btn-create")


def get_data(words: list, api: str):
    response = requests.get(f"{api}", timeout=1000)
    if response.status_code == 200:

        words.append(response.json()[0])
        word = response.json()[0]
        textbox.send_keys(word)
        addword_btn.click()
    else:
        print(
            f"There's a {response.status_code} error with your request")


words = []

number = int(input("Enter the number of words you want to add: "))

for _ in range(number):
    get_data(words, "https://random-word-api.herokuapp.com/word?number=1&length=5")

createcrossword_btn.click()
try:
    wait = WebDriverWait(driver, timeout=2)
    alert = wait.until(lambda d: d.switch_to.alert)
    text = alert.text
    if text == "Please enter at least 3 words":
        print(f"Test failed with the text {text}")
    alert.accept()

except:
    print("Test passed, the crossword is generated.")
# sleep(1000)
