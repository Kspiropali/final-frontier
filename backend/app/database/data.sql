-- USERS
INSERT INTO
    member(username, email, password, coins, items, allocated_tasks, is_activated)
VALUES ('bob', 'bob@bob.com', '$2b$12$8tDf1A4Iq2tkwv.4DSJkC.DvuPVcgy7t4r95hnK7tGYdjIkcl/LlS', 100, '{}', '{}', TRUE);

INSERT INTO
    member(username, email, password, coins, items, allocated_tasks, is_activated)
VALUES ('sam', 'sam@sam.com', '$2b$12$uZllZLq8kxU2srej7pv7Zum7ULiOa6lrUEhdVWXfErnKsshyjYY02', 50, '{}', '{}', FALSE);

-- TASKS
INSERT INTO
    task(name, description, duration)
VALUES ('task1', 'task1 description', 10);

INSERT INTO
    task(name, description, duration)
VALUES ('task2', 'task2 description', 20);

INSERT INTO
    task(name, description, duration)
VALUES ('task3', 'task3 description', 30);

-- ITEMS

-- AVATARS
INSERT INTO
    item(name, type, description, price, image)
VALUES ('Alex', 'avatar', 'Meet Adventurous Alex - The intrepid wanderer of the digital frontier! Alex is your passport to exciting online adventures, ready to conquer uncharted territories alongside you.', 20, 'https://api.dicebear.com/7.x/adventurer/png?backgroundColor=b6e3f4');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Ellie', 'avatar', 'Embrace Explorer Ellie - Your fearless guide to epic digital quests! With Ellie as your adventuring avatar, embark on thrilling journeys and conquer new realms in style.', 20, 'https://api.dicebear.com/7.x/adventurer/png?seed=AnekabackgroundColor=c0aede');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Notionist Nico', 'avatar', 'The mastermind of efficiency! Nico brings order to chaos and creativity to your digital workspace. Elevate your task completion today.', 20, 'https://api.dicebear.com/7.x/notionists/png?backgroundColor=ffdfbf');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Notionista Nora', 'avatar', 'Notionista Nora, Your organizational guru in the digital realm! With Nora by your side, conquer tasks, streamline your notes, and level up your productivity in style.', 20, 'https://api.dicebear.com/7.x/notionists/png?seed=FelixbackgroundColor=d1d4f9');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Whacky', 'avatar', 'The goofiest bot in town! Wacky is your trusty AI companion, here to add a touch of randomness and hilarity to your gaming quests.', 20, 'https://api.dicebear.com/7.x/bottts-neutral/png?');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Rusty', 'avatar', 'Your quirky sidekick for digital adventures! With a heart of code and a dash of whimsy, Rusty will keep you entertained and protected in the gaming world.', 20, 'https://api.dicebear.com/7.x/bottts-neutral/png?seed=Aneka');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Ollie', 'avatar', 'Say hello to Ollie - The Classic Avatar! Elevate your online presence with this timeless character. Embrace Ollie and bring a dash of fun and style to your digital adventures.', 20, 'https://api.dicebear.com/7.x/micah/png?flip=false');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Rosie', 'avatar', 'Elevate your online presence with this vibrant character. Stand out in style with Rosie and add a pop of color to your digital world.', 20, 'https://api.dicebear.com/7.x/micah/png?seed=FelixcbackgroundColor=ffd5dc');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Luna', 'avatar', 'Introducing Luna the Luminous Avatar! Elevate your online presence with this enchanting character. Stand out in style with Luna and add a touch of magic to your digital world.', 20, 'https://api.dicebear.com/7.x/micah/png?seed=AnekabackgroundColor=d8ec8f');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Becky', 'avatar', 'Meet Becky - Your pixelated companion in the digital world!', 20, 'https://api.dicebear.com/7.x/pixel-art/png?seed=Felix');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Classic', 'avatar', 'Classic Charm: Pixel Art Avatar - Timeless style for your online presence!', 20, 'https://api.dicebear.com/7.x/pixel-art/png?backgroundColor=d1d4f9');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Simon', 'avatar', 'Retro Vibes: Simon Avatar - What a sophisticated young man, get your dose of nostalgia!', 20, 'https://api.dicebear.com/7.x/pixel-art/png?seed=AnekabackgroundColor=d1d4f9');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Bigsmile', 'avatar', 'Meet the Big Smile Avatar! your ticket to spreading happiness in the digital world!', 20, 'https://api.dicebear.com/7.x/big-smile/png?seed=Aneka');

-- BACKGROUNDS
INSERT INTO
    item(name, type, description, price, image)
VALUES ('Starry Night Serenity', 'background', 'Gaze upon a mesmerizing night sky filled with twinkling stars and a sense of wonder. Let Shooting Stars set the stage for your digital adventures.', 20, 'https://images.unsplash.com/photo-1692026187565-5cd1ac9a4f5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Zen Garden Retreat', 'background', 'Find inner peace within the serene Zen Garden Retreat. Let this backdrop serve as a reminder to nurture your habits and embrace personal growth.', 20, 'https://images.unsplash.com/photo-1683806743160-2fc2e159dc66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Waves of Mindfulness', 'background', 'Ride the soothing Waves of Mindfulness as you work on daily habits. Connect with the calming rhythm of nature on your journey to personal development.', 20, 'https://images.unsplash.com/photo-1695327677553-aa69700a6fb7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Beach Dusk Tranquility', 'background', 'Experience the calming beauty of Beach Dusk Tranquility as you nurture your habits. Let the peaceful evening shore inspire your path to progress.', 20, 'https://images.unsplash.com/photo-1682547094964-dd621debede3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Jellyfish Dance', 'background', 'Dive into the Jellyfish Reflection and cultivate habits that enhance your growth. Watch as these graceful creatures symbolize your progress.', 20, 'https://images.unsplash.com/photo-1695153700362-446123bd2a59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Energetic Landscape', 'background', 'Harness the energy of the vibrant Energetic Landscape to fuel your habit-building journey. Infuse positivity into your daily tasks for a brighter future.', 20, 'https://images.unsplash.com/photo-1693662478385-5d75dde0538a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Urban Oasis', 'background', 'Discover your inner oasis with Urban Oasis. Let this backdrop remind you to find moments of calm amidst daily challenges, nurturing your journey.', 20, 'https://images.unsplash.com/photo-1688920556232-321bd176d0b4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Natures Harmony', 'background', 'Immerse yourself in the harmonious beauty of Natures Harmony while you build habits for personal growth. Find balance and serenity in your daily routines.', 20, 'https://images.unsplash.com/photo-1693462135458-22f289177360?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Starry Dreamscape', 'background', 'Under the Starry Dreamscape, your habits become stepping stones to reach for the stars in your journey. Each task takes you closer to your dreams.', 20, 'https://images.unsplash.com/photo-1693467855454-b12ce0cc0be9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1228&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Mountain Peaks', 'background', 'Discover serenity amidst the Mountain Peaks landscape. As you build daily habits, let the grandeur of these peaks inspire your journey.', 20, 'https://images.unsplash.com/photo-1692794180903-492910e2c5a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Fujis Resilience', 'background', 'Draw inspiration from the resilience of Fujis Resilience. As you build habits, remember that every challenge conquered is a step towards your goals.', 20, 'https://images.unsplash.com/photo-1692191778222-ef097375197c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Leaf Cascade', 'background',  'Embrace the tranquil beauty of Leaf Cascade, a close-up of a leaf with cascading water. Let it symbolize the flow of progress as you nurture your daily habits.', 20, 'https://images.unsplash.com/photo-1691253121599-073f111aa375?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Bamboo Bliss', 'background', 'Find serenity within Bamboo Bliss while cultivating habits. The steadfastness of bamboo mirrors your dedication to self-improvement.', 20, 'https://images.unsplash.com/photo-1690573838349-f20a683a596b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Sahara Serenity', 'background',  'Embark on a journey of self-discovery across the vast Sahara Serenity. Your daily habits are like grains of sand, building a foundation for success.', 20, 'https://images.unsplash.com/photo-1691358246149-49d63a1d730f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

INSERT INTO
    item(name, type, description, price, image)
VALUES ('Sunflower Wellness', 'background', 'Bask in the radiant warmth of Sunflower Wellness. Your habits are the rays of positivity that brighten your journey. Let them shine each day.', 20, 'https://images.unsplash.com/photo-1690746138480-1245dc220809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80');

-- User verification EMAILS
INSERT INTO
    email(username, token)
VALUES ('sam', 'sam');

-- MEMBER DETAILS
INSERT INTO
    member_detail(member_id, first_name, last_name, alias, quote, summary, gender, avatar)
VALUES (1, 'Bobby', 'Baum', 'Bobman', 'Best mage in wotlk', 'I am a potato', 'male', 'sam.png');

-- STATISTICS
INSERT INTO
    statistics(username, task_id, feedback, total_time)
VALUES ('bob', 1, 'Well done', 25);
