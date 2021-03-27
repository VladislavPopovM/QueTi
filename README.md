# QueTi

## Как запустить на локальном компьютере?

#### Загрузите код

#### Рекомендую создать виртуальное окружение для python или сразу переходи к Активации окружения:
```
python3 -m venv venv
```

#### Активанция окружения Python/Django:

Если создавалось вирт.окружение
```
source ./venv/bin/activate 
```

```
pip install -m ./r.txt
```

#### В папке с manage.py выполните команды.

```
python manage.py makemigrations
python manage.py migrate
```

#### И создайте Admin

```
python manage.py createsuperuser
```

#### Установка JS/Vue:
```
cd QuestionTime/frontend
npm install
```

#### Запустите Vue:
```
npm run serve
```

#### Запустите Django:
```
python manage.py runserver
```

#### Перейдите по ссылке 127.0.0.1:8000!
