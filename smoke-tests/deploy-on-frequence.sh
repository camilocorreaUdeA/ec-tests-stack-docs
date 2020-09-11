#!/bin/bash
environment=$1
region=$2
pathCoreDir=$PWD"/core"
pathOnFrequenceDir=$PWD"/workers/on-frequence"
nameOfEcosystem="ecosystem-"

if [ "$environment" != "test" ] && [ "$environment" != "production" ] && [ "$environment" != "demo" ]; then
    echo "ERROR: You need to pass as parameter the name of the environment (demo, test or production) to run this script."
    exit 1
fi

if [ "$region" != "east" ] && [ "$region" != "west" ]; then
    echo "ERROR: You need to pass as parameter the name of the region (east or west) to run this script."
    exit 1
fi

{
    git checkout .
} || {
    printf "Something went wrong with the command - git checkout . -"
    exit 1
}

echo "Cleaning previous changes..."
if [ "$environment" == "test" ]; then
    {
        git checkout test
    } || {
        printf "Something went wrong with the command - git checkout test -"
        exit 1
    }
elif [ "$environment" == "demo" ]; then
    {
        git checkout demo
    } || {
        printf "Something went wrong with the command - git checkout demo -"
        exit 1
    }
elif [ "$environment" == "production" ]; then
    {
        git checkout master
    } || {
        printf "Something went wrong with the command - git checkout master -"
        exit 1
    }
fi

echo "Fetching updates..."
{
    git pull
} || {
    printf "Something went wrong with the command - git pull -"
    exit 1
}

echo "Installing Core dependencies..."
echo "path "$pathCoreDir
cd $pathCoreDir
{
    npm install
} || {
    printf "Something went wrong with the command - npm install -"
    exit 1
}
cd "../"

echo "Installing OnFrequence dependencies..."
echo "path "$pathOnFrequenceDir
cd $pathOnFrequenceDir
{
    npm install
} || {
    printf "Something went wrong with the command - npm install -"
    exit 1
}

echo "Reloading the worker pm2 instance..."
{
    pm2 reload "$nameOfEcosystem$region.yml" --env $environment
} || {
    printf "Something went wrong with the command  -"
    exit 1
}
echo "Deployed successfully"
