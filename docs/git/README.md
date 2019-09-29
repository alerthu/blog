# Mac 切换 多个 GitHub 账号

我们通常会有自己的 github 账号和公司的 github 账号，但是有时却要在一台电脑上使用这两个账号。
介绍一种切换 github 账号的方法。
以工作账号 (work) 和自己账号 (personal) 为例。

## 为多个账号设置 ssh keys

分别用不同 github 账号对应的邮箱生成 ssh key.

```js
cd ~/.ssh
ssh-keygen -t rsa -C "私人账号邮箱"
// 提示命名的时候以 id_rsa_personal 命名
ssh-keygen -t rsa -C "工作账号邮箱"
// 提示命名的时候以 id_rsa_work 命名
```

## 将公钥添加到对应的 github 账号

略

## 添加配置文件管理私钥

```js
Host personal // USER_HOST为自定义host名字，如的personal和work
    HostName github.com // SERVER_HOST为实际服务器host，此时为GitHub
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_personal // PRIVATE_KEY为本地key
Host work
    HostName github.com // github.com 视情况替换为自己公司的git地址
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_rsa_work
```

## 更新 Identities

1. 清除缓存

```js
ssh-add -D
```

2. 添加 keys

```js
ssh-add ~/.ssh/id_rsa_personal

ssh-add ~/.ssh/id_rsa_work
```

3. 查看 keys

```js
ssh-add -l
```

4.测试 github 是否认可这些 key

```js
$ ssh -T personal
Hi githubPersonal! You've successfully authenticated, but GitHub does not provide shell access.
$ ssh -T work
Hi githubWork! You've successfully authenticated, but GitHub does not provide shell access.
```

::: tip 使用方法
当再次 clone 一个新 Repos 时，如果其 ssh 地址为 git@github.com:username/xxx.git，使用 git@company:username/xxx.git 即可。 （github.com 换成了自定义的 HOST (work) ）
对于已经存在的 repos 修改 remote url 即可。
:::