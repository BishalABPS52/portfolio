import pygame
import random
import math
import sys
from pygame import mixer

#starting pygame
pygame.init()

#game window
screen = pygame.display.set_mode((800,600),pygame.RESIZABLE)
# Scale factor (for scaling game objects)
scale_factor_x = 1
scale_factor_y = 1

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)

#background
background = pygame.image.load('PycharmProjects/Alien Invasion/assets/background.jpg')
backgroundmenu = pygame.image.load('PycharmProjects/Alien Invasion/assets/backgroundmenu.jpg')

#backgroundsound
mixer.music.load('PycharmProjects/Alien Invasion/assets/background.wav')
mixer.music.play(-1)

#game title
pygame.display.set_caption("Alien Invasion")
icon= pygame.image.load('PycharmProjects/Alien Invasion/assets/spaceship.png')
pygame.display.set_icon(icon)

#player
playerImg= pygame.image.load('PycharmProjects/Alien Invasion/assets/player.png')
playerX= 400
playerY= 530
playerXchange= 0

#explosion
explosionImg= pygame.image.load('PycharmProjects/Alien Invasion/assets/explosion.png')

#enemy jpgs
enemy_images = ['PycharmProjects/Alien Invasion/assets/enemy1.png', 'PycharmProjects/Alien Invasion/assets/enemy2.png', 'PycharmProjects/Alien Invasion/assets/enemy3.png','PycharmProjects/Alien Invasion/assets/enemy4.png','PycharmProjects/Alien Invasion/assets/enemy5.png','PycharmProjects/Alien Invasion/assets/enemy6.png','PycharmProjects/Alien Invasion/assets/enemy7.png','PycharmProjects/Alien Invasion/assets/enemy8.png']
#enemy lists multiple
enemyImg=[]
enemyX=[]
enemyY=[]
enemyXchange=[]
enemyYchange=[]
numEnemies= 5

# Fonts
font = pygame.font.Font('freesansbold.ttf', 24)
menu_font = pygame.font.Font('freesansbold.ttf', 30)
overFont = pygame.font.Font('freesansbold.ttf', 90)

# Menu colors
menu_text_color = (255, 255, 255)
menu_bg_color = (0, 0, 0)

# Menu items
menu_items = ["Start Game","High Scores","Exit"]
menu_selected = 0

# Level
leveltextX= 700
leveltextY= 10
level = 1
level_thresholds = [30,50,70, 100]  # Scores required to level up
max_levels = 5
enemies_by_level = [5, 7, 9,10, 15]  # Number of enemies for each level

# Adjust number of enemies for the current level
def adjust_enemies():
    global numEnemies, enemyImg, enemyX, enemyY, enemyXchange, enemyYchange
    numEnemies = enemies_by_level[level - 1]
    enemyImg = []
    enemyX = []
    enemyY = []
    enemyXchange = []
    enemyYchange = []
    for i in range(numEnemies):
        enemyImg.append(pygame.image.load(random.choice(enemy_images)))
        enemyX.append(random.randint(0, 735))
        enemyY.append(random.randint(30, 150))
        enemyXchange.append(0.7)
        enemyYchange.append(40)

# Initialize enemies for level 1
adjust_enemies()

#enemy
for i in range(numEnemies):
    enemyImg.append(pygame.image.load(random.choice(enemy_images)))
    enemyX.append(random.randint(0, 735))
    enemyY.append(random.randint(30, 150))
    enemyXchange.append(0.7)
    enemyYchange.append(40)

#bullet ready =bullet is not seen
bullet_images= ['PycharmProjects/Alien Invasion/assets/bullet1.png','PycharmProjects/Alien Invasion/assets/bullet2.png']
bulletImg= pygame.image.load(random.choice(bullet_images))
bulletX= 0
bulletY= 550
bulletXchange= 0
bulletYchange= 10
bulletState= "ready"


# Pause button coordinates and dimensions
pause_button_color = (255, 0, 0)  # Red
resume_button_color = (0, 255, 0)  # Green
pause_button_rect = pygame.Rect(20, 20, 100, 40)  # Position and size

#score
scorevalue=0
font=pygame.font.Font('freesansbold.ttf', 24)
textX= 10
textY= 10

#text for game over
overFont=pygame.font.Font('freesansbold.ttf', 80)

# Menu screen
def show_menu():
    global menu_selected
    running = True
    while running:

        title = menu_font.render("Alien Invasion", True, (160,40,20))
        screen.blit(title, (200, 100))
        screen.blit(backgroundmenu, (0, 0))

        for i, item in enumerate(menu_items):
            if i == menu_selected:
                text = font.render(item, True, (255,0,255))
            else:
                text = font.render(item, True, menu_text_color)
            screen.blit(text, (350, 250 + i * 50))

        pygame.display.update()

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                exit()
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_UP:
                    menu_selected = (menu_selected - 1) % len(menu_items)
                if event.key == pygame.K_DOWN:
                    menu_selected = (menu_selected + 1) % len(menu_items)
                if event.key == pygame.K_RETURN:
                    if menu_selected == 0:
                        return  # Start game
                    elif menu_selected == 1:
                        pygame.quit()
                        exit()

#showscore
def show_score(x,y):
    score = font.render("Score : " + str(scorevalue), True, (255,150,23))
    screen.blit(score, (x, y))

#level
def show_levels(x,y):
    levelscore= font.render("Level : " + str(level), True, (255,150,23))
    screen.blit(levelscore, (x, y))

#game over text
def gameOverText():
    overText = overFont.render("GAME OVER", True, (255,150,23))
    screen.blit(overText, (180, 250))
    # Display score and high score
    score_text = font.render(f"Score: {scorevalue}", True, WHITE)
    high_score_text = font.render(f"High Score: {high_score}", True, WHITE)
    screen.blit(score_text, (20, 20))
    screen.blit(high_score_text, (20, 80))

#drawing player
def player(x,y):
    screen.blit(playerImg,(x, y))

def explosion(x,y):
    screen.blit(explosionImg,(x, y))

#drawing enemy
def enemy(x,y,i):
    screen.blit(enemyImg[i],(x, y))

def fire_bullet(x,y):
    global bulletState
    bulletState = "fire" #bullet fire
    screen.blit(bulletImg,(x+16,y+100  ))

def iscollison(enemyX,enemyY,bulletX,bulletY):
    distance=math.sqrt((math.pow(enemyX-bulletX,2))+(math.pow(enemyY-bulletY,2)))
    if distance<27:
        explosion(enemyX,enemyY)
        return True
    else:
        return False

show_menu()
high_score = 0

# Function to load high score from file
def load_high_score():
    try:
        with open("high_score.txt", "r") as file:
            score = file.read().strip()
            # Check if the file contains a valid integer score
            if score.isdigit():
                return int(score)
            else:
                return 0  # Return 0 if the data is not valid
    except FileNotFoundError:
        return 0  # Return 0 if the file doesn't exist
    except ValueError:
        return 0  # Return 0 if there's an issue converting to integer

# Return 0 if the file doesn't exist

# Function to save high score to file
def save_high_score(scorevalue):
    with open("PycharmProjects/Alien Invasion/assets/high_score.txt", "w") as file:
        file.write(str(scorevalue))

# Load high score at the start of the game
high_score = load_high_score()

#Game loop
running=True
while running:
    # screen color
    screen.fill((0, 0, 0))
    #background image
    screen.blit(background,(0,0))

    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running=False
        #move right or left
        if event.type == pygame.KEYDOWN:

              if event.key == pygame.K_LEFT:
                  playerXchange = -3
              if event.key == pygame.K_RIGHT:
                  playerXchange = 3
              if event.key == pygame.K_SPACE:
                  if bulletState == "ready":
                    bulletSound=mixer.Sound('PycharmProjects/Alien Invasion/assets/bulletfire.mp3')
                    bulletSound.play()
                    bulletX= playerX
                    fire_bullet(bulletX,bulletY)

        if event.type == pygame.KEYUP:
              if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                  playerXchange = 0

    #player boundary
    playerX += playerXchange

    if playerX <= 0:
        playerX =0
    elif playerX >= 736:
        playerX =736

    #enemy movement
    for i in range(numEnemies):

        #GameOver
        if enemyY[i]>480:
            for j in range(numEnemies):
                enemyY[j]=1000
            gameOverText()
            break

        enemyX[i] += enemyXchange[i]

        if enemyX[i]<= 0:
            enemyXchange[i] = 2
            enemyY[i] += enemyYchange[i]
        elif enemyX[i] >= 736:
            enemyXchange[i] = -2
            enemyY[i] += enemyYchange[i]

        #collison occurence
        collison = iscollison(enemyX[i], enemyY[i], bulletX, bulletY)
        if collison:
            explosionSound = mixer.Sound('PycharmProjects/Alien Invasion/assets/collison.mp3')
            explosionSound.play()
            bulletY = 480
            bulletState = "fire"
            scorevalue+= 1
            enemyX[i] = random.randint(0, 735)
            enemyY[i]= random.randint(30, 150)
        enemy(enemyX[i], enemyY[i],i)

    #bullet moment
    if bulletY <= 0:
        bulletY = 580
        bulletState ="ready"

    if bulletState == "fire":
        fire_bullet(bulletX,bulletY)
        bulletY -= bulletYchange

    #
    # Level up logic
    if level < max_levels and scorevalue >= level_thresholds[level - 1]:
        level += 1
        adjust_enemies()

        # Check if the current score is higher than the high score
        if scorevalue > high_score:
            high_score = scorevalue
            save_high_score(high_score)  # Save the new high score


    player(playerX, playerY)
    show_score(textX,textY)
    show_levels(leveltextX, leveltextY)
    pygame.display.update()