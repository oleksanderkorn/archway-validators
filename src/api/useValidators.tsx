import axios from "axios";
import { useEffect, useState } from "react";
import Validator from "../routes/validator";

export interface Validator {
  operator_address: string;
  hex_address: string;
  account_address: string;
  consensus_address: string;
  jailed: false;
  status: string;
  tokens: number;
  moniker: string;
  identity: "";
  avatar: string;
  commission: string;
  comulative_share: number;
  voting_power_percent: number;
  rank: number;
  uptime: number;
  isGenesis: boolean;
}

const useValidatorsNG = () => {
  const [validators, setValidators] = useState<Validator[]>();
  useEffect(() => {
    getValidators();
  }, []);

  const getValidators = () => {
    axios.get("https://archway.api.explorers.guru/api/validators").then(
      (res) => {
        setValidators(
          res.data.map((r: Validator) => {
            return {
              ...r,
              isGenesis: genesis.indexOf(r.account_address) > -1,
            };
          })
        );
      },
      (err) => {
        console.error(err);
      }
    );
  };

  return validators;
};

const genesis = [
  "archway1ntu5fmt2c6djgyxszefftpd89n7dma3p6nrtgq",
  "archway1ea327s9scrxz0yjy34f6n8pydjumu93ucuqcug",
  "archway1atwx2cs5fep6gr92vlrkqmjmtukaqerewgyaec",
  "archway1yvhz3d0744ge3ayweakaj867cf6vyuhxmctrp2",
  "archway1j2t0yfqf5467cn53s6zjue859jsmn7966t50v2",
  "archway1fhg3x3achdy55kcxnktdqzarvsagn75hrfrtry",
  "archway16kspwgyd43xj5xm73c8j90v2rqra6pa5gfx0ck",
  "archway1fe6tvr8p6p7rmtgmyj85df0l5le0ds7d5d52ms",
  "archway188gxl0puff90zj59zmwclqa36dffl9z0zwjncp",
  "archway1h2v83q9dh483wq006yj3ejexq402dqh6spml3e",
  "archway12snhgfwmk6w4vv5cxysatxpnc8zx5p88ezpn6g",
  "archway1mrf3rnhxx5ad09r0qu76c65jchsu39m7cy7ea2",
  "archway1lkjmc5qcehwdeze372nv75urpn6zu7l5amhe8z",
  "archway15w5rz5sawjxd97p9nq6yvtqkkszauhfhruxhvz",
  "archway1wqvurx2eca0q8ktaucw6f7yz9s2fkx9mwm8u7m",
  "archway17f79r9cj87gd2pnkjewjktlcead35kta2c2yt4",
  "archway1n5e6xpqnryxddgf0lg4d268cfdcdkdnxmdnzja",
  "archway18atq9qkp2pjr023xs40j840tcvajth2lhymlz7",
  "archway1npc03r8wt9vxst7g03x3kf93j3d0pvpway2d6g",
  "archway10kvr0erv3jmw0pug9vlqzrvpvxynm88mzcxv9m",
  "archway1pm0yyd2ncc2x67ctuz5p3tcxa59tezx5scp0hj",
  "archway1km7f2thmune6j7az5qudkcputqeytawurws0f5",
  "archway1j7zcyetwp4dpmv6hyp9cg9ae8vj887xqulgxmd",
  "archway1um2x7lls8h6g2hdnkxqsq0z40sme9au6r5tdu9",
  "archway1qquw726wyxfvmmaplj8mzcrzdrgvxcsue5qw4j",
  "archway15dlpwv3gyx4cmllur8054csa40y7gjqppm2ha6",
  "archway1lhja3rdhzkev9p4nppl337qtj0hm0x3h42gyu3",
  "archway13kmvjzcqlvqm5rpzhkxvg3f6a4yh3g7c64cqws",
  "archway1svquqvk27hfq6kvx9m8hg4wcucu644z57yjez6",
  "archway1y5hevmtayusk9f0e429s60rmjweza7yej2qxu7",
  "archway1da0xjcwdt2cd9llzhqtsrzytx74qdn4fugaeeg",
  "archway1acjahn6guvzslmu7qads3sr9kek7gy3gqqc5yn",
  "archway1s0avtj2kcx5q4anque29e3sqm365e4d2jkmk0k",
  "archway1ve8dr8g7tz99kgew4j80ld9zwfrmcwm5ak39z8",
  "archway162nz5pgq5e0au2ttr3yplvus5zqlt8ev0tzkdj",
  "archway1rygvqg7xan94dh23y6jzcanvlx2j2l27tvdmws",
  "archway1fmcs7u8p32n3a9563c3rdfqy65ugegatacajff",
  "archway1yh9xhsnnveys532df2nfsuwj44pj6kf4hxlwvq",
  "archway1wyhss8a9q00mp3z7mdq69c37c4x8hz4w6qel6n",
  "archway12u3gyqh4ghgaupjc245cnvjycf40tvq9xr6y9f",
  "archway184hv0zmw2n9ud3h87mdykz22dr2d7yumpye2pm",
  "archway1630dzuj06kh3m2xznv4auewpvjjfd9anvfpnp9",
  "archway1kj696z7tkwv4kzml750nmvelfkzll0sfxg5374",
  "archway1gjvr75e305xvt5jzsrwwwtnwx46k6f06z3sqse",
  "archway1y09v3ft7w3k6y7l76pl92nemp6tu4m0fdwtnjh",
  "archway1qcme8mpfved7r3jdhka77kr7ppspe37p4c46n7",
  "archway1cmt5j83q77mvu7m7g3mz6cvkgm4tq2zcecwy3y",
  "archway1jkhtfd5hcq603ladf5hnl00qhrdafm8cwv9una",
  "archway15xjvj64lpwy3df084zycfslpju6t3s7mgpy59t",
  "archway1rvgsyas9njewjtqjgl378j9dggp4hgk5wukue4",
  "archway1da2wunkngvt5kwnu93m9uj3x3u3x3hqnhxeffr",
  "archway1gyudeepj6puzezucs27wklgvxfhhzcmrmlnnff",
  "archway1xs75ha4z23ew9tekrrzakp9yxlhsrt65dy2xqz",
  "archway1y4f0mmj7u4awfykxtf48vu9d72uujwyvf9w00c",
  "archway1vl3ftkva3rljgzyjr4usyf3mczp09m0kgyjehv",
  "archway1f6426yftgnydwaru4u746aj0n3pj3vc8m38qw4",
  "archway1msnjlmual9524f2k3etu0vs6hsnjayxlmz7ktj",
  "archway1a8zzzser53q5cjqs75agpxytmhen5c947287dg",
  "archway1cmnx20k5tvy8lntxxzj28wngs5zslf9r9h8v3u",
  "archway13tlhr926wyf4ryplk7skqh6lpkaspe37mahac8",
  "archway1rvl0zzzpaqz5437vgvgqxfgsatxjzwcvc5grf7",
  "archway18nkyh6h42hut7yzr3jet7nehp5zn8qy9c64ew7",
  "archway1ng5hcu38w0kr224a2dzfz2rk9wn9tc5cz63zs8",
  "archway15tf4r49aae9cepxelxp7wxckc6xw7vf74rtvvq",
  "archway1sz6fjy5sctvwezsarafyq7pvjq8h3l6wkeqjyv",
  "archway1ng4fg3xnxa4n7z53gqmzuwcpjqgaqya92mq0kx",
  "archway1mdv4vcqfa6z8upw22cnhr8dzxf07vt0swxjry7",
  "archway18x5409fhq6ely20gqwv9dxqdjqgtj6x8m7tmxw",
  "archway1crrw2jmhayzlmgkd3ktmkantq249uftl9lav7n",
  "archway1dv32zke3uglatf359f2m0n9m899cxp9v8thvgu",
  "archway1zlrtsytf09554q0mkn52n4mdfrdrrmw68z6p2p",
  "archway1s6nkphhr79galgsjreg73kqq8rerxfzaacl52x",
  "archway1nms20r7jzaa4ms9exv90ckl2xfn0rd3rmqh7zm",
  "archway14zvxdtkgwnygnshwaxtzu36re5vk7x3klcsvay",
  "archway1zcpcp9g7lzm7yhduflcs473mwsgvtfvvsqp3tq",
  "archway1uzuyxmnqlxx270jwlqtljh4gn2u5yw2wlhtgxq",
  "archway1w7lzvp7fgdapq3pp38w8lzk6vwll9gpupdyryf",
  "archway13c4x6jmq9r9n42kvqtq85ycr3uvr4j0eqmccx8",
  "archway1y4ylue7k0nph3a2mxrts7c0scudc762xrrn0kt",
  "archway1dudt74ywvppvv0jwhsnp3597e7t0xexjtmh5dj",
  "archway18s0xmejzzs7cuemlwz4ed04spc57dv03l4yl3m",
  "archway148lqgd9vut7w5au060fsw67zhup04f2jnt4zud",
  "archway18tqhghpahptgxnvsjc5tj6sqr5kv67ser7v6jk",
  "archway1mduqxju4rthkdpkc58xntal42vcek03q0mnte5",
  "archway1ejzs4erqllea9vs9w7guhas9xt52g9nvle3xxm",
  "archway1m456r2crkpejqkhlzg66kd0gknuc87mxltcfaw",
  "archway1mg082q7ty8y2up9cvlrjyasem56w3cpv2ud4fz",
  "archway172vcxnn28sk9n634hh58fggl0u4ucs7xpek3mt",
  "archway13wj3tmtegr73gmsv3z57xfxyam2kmzkvp7xgv8",
  "archway1y3c6wsm752uy9jnrt3pchtydv6qamu2mj7j48r",
  "archway1m4hgckl57gllmcmsxly4zcj3xyc3d7084sa7fp",
  "archway19rumf6aen5nx2p8ck93yhmfghmsxlcy4eejfpm",
  "archway1tmr0mp26zs0aw2cpz9e9q55f6tasrj2m6wuavc",
  "archway136p9g0wu3jrj7rf0t5y962vn0fue92mznyd2kf",
  "archway1uxgjn8ykj0eelh9gdv9xp5gmjd4nzjvqepvkgz",
  "archway1jft9dgcm278f2890gxvh997aauc9p79gvu04sq",
  "archway1adatsskuvr37avvsehn0vue5nvnweslvn64ukk",
  "archway1pf3jlsuudx78hunp6u9ae66962g6rjr8umydt2",
  "archway1vq0da48r4r6acctqnttd4d6fltw6wc037yqydy",
  "archway1kryk7efka4wpg8nnk0u9g85wg9c8m9ryffhwhm",
  "archway1ck3wsn98s2tws78ctkc2g5f2cxu9f6vtn0e2uq",
  "archway1kmkfrw8c03fudzldwtsxhenep7kn7ca65x76vw",
  "archway1jdws3e0c9rrgwcmq8fpzfry6ysg0kvefak0n0w",
  "archway13d7ccp3fztpzfafaqjd4hpjqy8xzr4epsev2sc",
  "archway1guwwtsuntmalujkkwqc737x9j5kvarcjxzvgxv",
  "archway1x3t5c6c76n8nya85wrs8y0lv54zj3vnfarkjey",
  "archway1shjksexgv8hgwhe4ywr663dfcl433zhzhpqf8j",
  "archway1hft8jvacpmwcez4rhjxprm8r8huzucephy7wzh",
  "archway1m6h9jmxea7hhveslydeepgku72guzm79n8zkhg",
  "archway1dc0wycnatytdht8uen02uvenyghrrftfaegda7",
  "archway1ngvk9v5jhdk7xl0h4lcshavpp05lpy7jzwgy4g",
  "archway1pq6f5a0l68q5khnhgdagkjtlcxm5zu9jxadkpw",
  "archway17w6tqzef4xk5at696ctjhn8ejzy7ecmskl6zft",
  "archway1k3ncrglm43rga5e8wj5eh9207sa5yjhsupxpym",
  "archway173kxzhlzsdassj9wml3unc8g4z90laleqgq4du",
  "archway1shlvwxwfwkqjvth0fkl9wzrrmsu4cpghmlu742",
  "archway16jsfxdj54fs0dmu2nfsyms6uunpwuyeec00gtx",
  "archway1jjc3ff34ggcmj848fklqssmcy88zas792904p3",
  "archway17ps7pdsqtg79k9l0cmez0sfdd7y36ccpyzhv7u",
  "archway1yn847wthj4z8th2uug6g7n4m3vd843ndqqp3yx",
  "archway1l3pflqxkxl5jyqfsxayvxkvjr5layk8j2kudck",
  "archway1u8rks82gfsmc3527rnjll6q73cvm70df62r9vg",
  "archway1ym2acq4fdnavpgskskwqemthq6vdtwhhm74sc7",
  "archway1tqr8wagu7zxy0sc5lk8js04qpydm0tzslvr7dg",
  "archway1lymukl95uzjv7fc2ermgtmp7q9y520lhys5qvz",
  "archway18lqjlgv2ju7jkej84wm60vmmjuv7cmgh9pna5e",
  "archway1wt8tk39accx6vx584r9rdm8m3tm32djvxslhku",
  "archway188mhlwuekwd88u8n470v8cn2qpsufs64qt750c",
  "archway1rfmce0a05wy8yrv8zmjjc0gpnlultfm20fm3ql",
  "archway1uupksdst0mjtxfy5tj2zlytud3y2rfqfw83yc3",
];

export default useValidatorsNG;
