let str = '/?222,222,222'
let [userid, amount, memo] = str.slice(2).split(",") //?


encodeURIComponent('/?userid=222&amount=222&memo=222') //?
