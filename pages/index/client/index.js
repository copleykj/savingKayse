var facebookImages = [
    {
        width:200,
        height:300,
        url:"https://scontent-b.xx.fbcdn.net/hphotos-prn2/v/t1.0-9/543141_10151149995007584_516551139_n.jpg?oh=635053d007a5682185ca404ac8e8f9f1&oe=55021AC1"
    },
    {
        width:200,
        height:300,
        url:"https://fbcdn-sphotos-a-a.akamaihd.net/hphotos-ak-xpa1/v/t1.0-9/65563_10151274229142584_936134216_n.jpg?oh=2e2e7d41658eda3f2eb6cd469e86bb01&oe=55452C5E&__gda__=1425661741_f381fd4cd9ea28503bd84892030a7009"
    },
    {
        width:200,
        height:300,
        url:"https://scontent-b.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/304570_10150303720737584_244486026_n.jpg?oh=94f67d723ba3b65604ee9711f6016072&oe=5506A463"
    },
    {
        width:300,
        height:200,
        url:"https://scontent-b.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/265107_10150218380782584_7529922_n.jpg?oh=bb1b9b99eb8fb85502e1836edbf7814c&oe=553A6DBB"
    },
    {
        width:200,
        height:300,
        url:"https://scontent-a.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/10347476_10152343380202584_8794472177482731477_n.jpg?oh=67d98f5897dc044e8834b6a0f089a468&oe=553C600A"
    }
];

Template.index.helpers({
    facebookImages: function() {
        return facebookImages;
    }
});