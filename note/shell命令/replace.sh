#! /bin/bash
old_str='http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=16097430'
new_str='https://beian.miit.gov.cn/#/Integrated/index'

sed -i "s/${old_str}/${new_str}/g" `grep ${old_str} -rl ./*.html`
#备份: cp -r 源目录  目标目录


# 替换命令 sed -i "s/原字符串/新字符串/g" `grep 原字符串 -rl 所在目录`
# 示例 sed -i "s/大小多少/日月水火/g" `grep 大小多少 -rl ./` 

cd $1
if [ -z $1 ];then
    echo "参数不能为空,请输入要替换的主目录"
    exit 1
if

if [ ! -e $1 ];then
    echo "参数有误，目录不存在"
    exit 1
fi
echo "正在为你替换..."
sed -i "s/${old_str}/${new_str}/g" `grep ${old_str} -rl ./*.html`
echo "替换完成..."

exit 0





