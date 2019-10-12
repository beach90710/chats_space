# README

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|
|email|text|null: false|
|password|text|null: false|

### Association
- has_many :massages
- has_many :groups,through: groups_users
- has_many :groups_users

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false,index: true|

### Association
- has_many :user,through: groups_users
- has_many :massages
- has_many :groups_users

## groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|text|text|null:true|
|image|string|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

