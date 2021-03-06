import maps from "./maps"
import epicItems from "./epicItems"
import sprites from "./sprites"

const data = {
    game: {
        size: 400,
        gameState: [],
        Skeleton: {
            name: "Skeleton",
            health: 80,
            currentHealth: 80,
            attackLow: 10,
            attackHigh: 12,
            number: 2,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp, monsterName) => {
                        giveExperience(game, 25, levelUp, monsterName)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 1
                }
            }
        },
        Bat: {
            name: "Bat",
            health: 60,
            currentHealth: 60,
            attackLow: 5,
            attackHigh: 8,
            number:6,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp, monsterName) => {
                        giveExperience(game, 15, levelUp, monsterName)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 0.5
                }
            }
        },
        Werewolf: {
            name: "Werewolf",
            health: 150,
            currentHealth: 150,
            attackLow: 15,
            attackHigh: 19,
            number: 1,
            dropTable: {
                experience: {
                    effect: (game, giveExperience, levelUp, monsterName) => {
                        giveExperience(game, 50, levelUp, monsterName)
                    },
                    chance: 100
                },
                item: {
                    effect: (game, giveItem) => {
                        giveItem(game)
                    },
                    chance: 100
                }
            }
        },
        Boss: {
            name: "Boss",
            health: 700,
            currentHealth: 700,
            attackLow: 40,
            attackHigh: 50,
            number: 0
        },
        chest: {
            name: "chest",
            items: [
                "vitality",
                "strength",
                "agility",
                "weapon"
            ],
            number: 3
        },
        potion: {
            name: "potion",
            restore: 50,
            number:5
        },
        player: {
            name: "player",
            maxHealth: 100,
            currentHealth: 100,
            attackLow: 0,
            attackHigh: 2,
            currentWeapon: 0,
            vision: 4,
            number: 1,
            level: 1,
            currentExperience: 0,
            maxExperience: 100,
            damageReduction: 0,
            dodge: 0,
            lifeSteal: false,
            doubleAttack: false,
            isAlive: true,
            "items": {
                "weapon": [
                    10,
                    15,
                    20,
                    25
                ]
            }
        },
        won: false,
        log: ["", "", "", "", ""],
        epicItems,
        level: 1,
        currentLevel: 1
    },
    maps,
    sprites
}

export default data




/*
0 = dirt
1 = floor
2 = wall
3 = wall + torch
4 = floor + portal


*/
/*
-basic stats:
    vitality: increase health by 10
    strength: increase attack by 4-6
    agility: increse dodge change by 10% up to a maximum of 30%

level increase:
    -there are going to be 5 levels of dungeons
        -not sure if im gonna make them or randomly generated, maybe only the map is gonnabe premade
    -every level is gonna increase the stats of the monsters
    -player and monster level increase are going to be very similar
    -every level gonna have a boss monster that you have to defeat and is gonna drop a random epic item
*/
