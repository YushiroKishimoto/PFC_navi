--acounts
--アカウント情報
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    login_id VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- users
-- ユーザー身体情報・目標情報
CREATE TABLE users (
    user_id INTEGER PRIMARY KEY,
    login_id VARCHAR(20) NOT NULL UNIQUE,
    age INTEGER NOT NULL CHECK (age >= 0),
    sex VARCHAR(10) NOT NULL,
    height NUMERIC NOT NULL CHECK (height >= 0),
    weight NUMERIC NOT NULL CHECK (weight >= 0),
    burn_cal NUMERIC NOT NULL CHECK (burn_cal >= 0),
    target_cal INTEGER NOT NULL CHECK (target_cal >= 0),
    pfc_course INTEGER NOT NULL CHECK (pfc_course >= 0),
);

-- default_foods
-- 初期登録済み食品マスタ
CREATE TABLE default_foods (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    pro INTEGER NOT NULL CHECK (pro >= 0),
    fat INTEGER NOT NULL CHECK (fat >= 0),
    car INTEGER NOT NULL CHECK (car >= 0),
    cal INTEGER NOT NULL CHECK (cal >= 0)
);


-- custom_foods
-- ユーザー独自食品

CREATE TABLE custom_foods (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    login_id VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    pro INTEGER NOT NULL CHECK (pro >= 0),
    fat INTEGER NOT NULL CHECK (fat >= 0),
    car INTEGER NOT NULL CHECK (car >= 0),
    cal INTEGER NOT NULL CHECK (cal >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- set_foods
-- 食事セット

CREATE TABLE set_foods (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    login_id VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    total_pro INTEGER NOT NULL CHECK (total_pro >= 0),
    total_fat INTEGER NOT NULL CHECK (total_fat >= 0),
    total_car INTEGER NOT NULL CHECK (total_car >= 0),
    total_cal INTEGER NOT NULL CHECK (total_cal >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- set_items
-- 食事セットの明細
-- default_foods / custom_foods のどちらかを item_type で判別

CREATE TABLE set_items (
    id SERIAL PRIMARY KEY,
    set_food_id INTEGER NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    item_id INTEGER NOT NULL,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    pro INTEGER NOT NULL CHECK (pro >= 0),
    fat INTEGER NOT NULL CHECK (fat >= 0),
    car INTEGER NOT NULL CHECK (car >= 0),
    cal INTEGER NOT NULL CHECK (cal >= 0)
);

-- meal_records
-- 食事記録
CREATE TABLE meal_records (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    login_id VARCHAR(20) NOT NULL,
    meal_type VARCHAR(50) NOT NULL,
    total_pro INTEGER NOT NULL CHECK (total_pro >= 0),
    total_fat INTEGER NOT NULL CHECK (total_fat >= 0),
    total_car INTEGER NOT NULL CHECK (total_car >= 0),
    total_cal INTEGER NOT NULL CHECK (total_cal >= 0),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- meal_record_items
-- 食事記録の明細
-- default_foods / custom_foods / set_foods のどれかを item_type で判別
-- =========================================
CREATE TABLE meal_record_items (
    id SERIAL PRIMARY KEY,
    meal_record_id INTEGER NOT NULL,
    item_type VARCHAR(50) NOT NULL,
    item_id INTEGER NOT NULL,
    amount INTEGER NOT NULL CHECK (amount >= 0),
    pro INTEGER NOT NULL CHECK (pro >= 0),
    fat INTEGER NOT NULL CHECK (fat >= 0),
    car INTEGER NOT NULL CHECK (car >= 0),
    cal INTEGER NOT NULL CHECK (cal >= 0)
)