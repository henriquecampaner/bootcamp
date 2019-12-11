# Rocketseat Bootcamp Cerification Challenge

<h3 align="center">
  Gympoint Full Stack
</h3>

## 🚀 About the challenge

This is my submission for the Bootcamp's final challenge: a full-stack application
that lets administrators manage daily gym functions, and lets students post questions
about workouts and healthy habits.

I put a lot of hard work in this entire process: it became the focus of all my free time. 
I hope ya'll like my work and see the passion behind each line of code. It's been crazy 
these last few months, and I'm stocked this is finally done.

## ⚙️ Technologies

#### Back-end

- NodeJS
- Express
- Sequelize
- PostgresSQL
- bcrypt
- JWT
- date-fns
- Yup
- HandleBars

#### Front-ends

- ReactJS & ReactNative
- Axios
- Redux & Saga
- Immer
- date-fns
- Styled Components & Polished
- Yup
- Rocketseat Unform
- PropTypes
- MaterialUI Modals

## 👥 Cloning the repo

Since I used git submodules, a normal clone won't do the trick. Git submodules 
allow us to easily link repos so that we:
- Save on storage by avoiding repo crowding;
- Have version control from within the repo, and only pull the submodule version
that's compatible with the project;
- Easily pulll the latest version of the submodules with `git pull --recurse-submodules`;

Run git clone with the recursive flag to pull the entire thing:

```
git clone --recursive https://github.com/xxxxxx
```

## 🤖 Running the back-end

To boot, we need to create three Docker containers to handle the application's
various jobs and databases. Assuming you have
[Docker installed](https://docs.docker.com/install/), run these:

```
docker run --name postgres -e POSTGRES_PASSWORD=91327915 -p 5432:5432 -d -t postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine
```

and wait for the machines to boot. We then navigate into to the project's
directory, create a .env file,

```
cd backend
```

and fill out the relevant info. Take note of the machine's IP, which should remain the same
for the other configurations of the front-end: the API service and reactotron. You can easily find your
network IP by runnig `ifconfig` on Linux and `ipconfig` on Windows. I noticed that each 
operating system has its particularities with these setups. For example, in Windows we have to 
set-up the reactotron (`~/gympoint_front_end_XXX/src/config/ReactotronConfig.js`) on `localhost`, 
even the mobile one. In Linux however, we use the machine's network IP. Unless you're running an android 
emulator, I recomend using the network IP for all configurations if it let's you. You can get by using with using `localhost`, but it'll probably take some tinkering. I didn't test these at all with Mac and iOS.

[Mailing](https://mailtrap.io/) is completely set up; 
just fill out the DSN and the mailing fields and you're golden.

```
APP_URL=http://YOU.R00.000.0IP
NODE_ENV=development

# Auth

APP_SECRET=9d2b2e84e506a7af0fa6e2103366793e

# Database

DB_HOST=localhost
DB_USER=postgres
DB_PASS=docker
DB_NAME=gympoint


# Redis

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# Mail

MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

We then run the initial yarn and sequelize configuration,

```
yarn
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
```

after which we can finally run the backend:

```
yarn dev
```

With the mail service configured we can also run the jobs machine in a second Screen

```
yarn queue
```

Also, check out the the latest Insomnia Workspace inside `gympoint_back_end/insomnia_workspaces`.

## 🖥️ Running the web front-end

We then open a third Screen, navigate into the project's directory and run yarn:

```
cd web
yarn
```

Edit the API's url to match the back-end's

```
nano ./src/services/api.js
```

```
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://YOU.R00.000.0IP:3333',
});

export default api;
```

We then start the development server, and the web app should pop right up:

```
yarn start
```

The deault admin user is `admin@gympoint.com`, password `123456`.

## 📱 Running the Android front-end

We then open a fourth Screen, navigate into the project's directory and run yarn again:

```
cd mobile
yarn
```

Also edit the API's url like in the step above:

```
nano ./src/services/api.js
```

If you do decide to run it on an Android phone, you'll first have to:

- Enable Developer Options;
- Enable USB Debugging;
- Go to your PHONE app (yeah, the one where you make phone calls in), dial
  `*#0808#` and enable `MTP + ADB`;
- Run:

```
adb devices
adb reverse tcp:9090 tcp:9090
react-native start
```

- And in a fifth Screen:

```
react-native run-android
```

This takes a while, so grab yoursel a cold one. Now I'm not gonna get into whether
or not you should emulate this thing, but I recomend running it in a physical Android
device.

Hopefully by now you'll have the entire project working on both fronts and
consuming the API like a champ.

## 📝 License

This software comes with the hyper-permissive [MIT LICENSE](LICENSE.md).

---

Made with ♥ by [Henrique Campaner](https://github.com/henriquecampaner)  :wave:
