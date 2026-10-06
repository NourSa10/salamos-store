const CURRENCY = 'د.ج';

const PRODUCTS = [
  { id:1, name:'قميص رجالي كلاسيكي', price:3500, oldPrice:4500, category:'ملابس',
    image:'https://picsum.photos/seed/shirt1/400/400', rating:4.6, reviews:87, badge:'خصم',
    desc:'قميص رجالي بقصّة أنيقة، مصنوع من القطن 100%، مناسب للمناسبات والعمل اليومي.' },

  { id:2, name:'فستان نسائي أنيق', price:6500, oldPrice:null, category:'ملابس',
    image:'https://picsum.photos/seed/dress1/400/400', rating:4.8, reviews:112, badge:'جديد',
    desc:'فستان نسائي عصري بتصميم راقي، مثالي للسهرات والمناسبات الخاصة.' },

  { id:3, name:'جاكيت شتوي مبطن', price:8900, oldPrice:11000, category:'ملابس',
    image:'https://picsum.photos/seed/jacket1/400/400', rating:4.7, reviews:65, badge:'خصم',
    desc:'جاكيت شتوي دافئ ومقاوم للماء، بتصميم عصري يناسب جميع الإطلالات.' },

  { id:4, name:'هاتف ذكي حديث', price:45000, oldPrice:52000, category:'هواتف',
    image:'images/Phone1a17.jpg',s/Phone1a17.jpg', rating:4.9, reviews:203, badge:'خصم',
    desc:'هاتف ذكي بشاشة AMOLED عالية الدقة، كاميرا 108MP، وبطارية تدوم طوال اليوم.' },

  { id:5, name:'سماعات لاسلكية', price:4500, oldPrice:null, category:'هواتف',
    image:'https://picsum.photos/seed/earbuds1/400/400', rating:4.7, reviews:145, badge:'جديد',
    desc:'سماعات بلوتوث بعزل ضجيج نشط، صوت نقي، وبطارية تدوم حتى 30 ساعة.' },

  { id:6, name:'شاحن سريع 65W', price:1800, oldPrice:2400, category:'هواتف',
    image:'https://picsum.photos/seed/charger1/400/400', rating:4.5, reviews:98, badge:'خصم',
    desc:'شاحن سريع بقوة 65 واط، يشحن هاتفك بالكامل في أقل من ساعة.' },

  { id:7, name:'عطر رجالي فخم', price:7500, oldPrice:9500, category:'عطور',
    image:'https://picsum.photos/seed/perfume-m1/400/400', rating:4.8, reviews:156, badge:'خصم',
    desc:'عطر رجالي شرقي فخم، برائحة تدوم طويلاً وتترك أثراً لا يُنسى.' },

  { id:8, name:'عطر نسائي زهري', price:8200, oldPrice:null, category:'عطور',
    image:'https://picsum.photos/seed/perfume-w1/400/400', rating:4.9, reviews:178, badge:'جديد',
    desc:'عطر نسائي بنفحات زهرية راقية، مثالي للإطلالات اليومية والمناسبات.' },

  { id:9, name:'عطر مسك أبيض', price:5500, oldPrice:6800, category:'عطور',
    image:'https://picsum.photos/seed/perfume-musk/400/400', rating:4.6, reviews:124, badge:'خصم',
    desc:'عطر مسك أبيض ناعم بثبات عالٍ، مناسب للرجال والنساء.' }
];
