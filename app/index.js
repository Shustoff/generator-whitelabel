'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var WhitelabelGenerator = module.exports = function WhitelabelGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WhitelabelGenerator, yeoman.generators.NamedBase);

WhitelabelGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  console.log(this.yeoman);

  var prompts = [
    {
      name: 'whitelabelName',
      message: 'Введите системное название вайтлейбла (например: eviterracom).'
    },
    {
      name: 'whitelabelDomain',
      message: 'Введите домен сайта партнера (например: eviterra.com).'
    },
    {
      name: 'whitelabelTitle',
      message: 'Введите заголовок вайтлейбла который будет в title. (например: Eviterra — самые дешевые авиабилеты по всему миру онлайн. )'
    },
    {
      name: 'whitelabelSupportPhone',
      message: 'Введите телефон тех. поддержки для вайтлейбла. (например: +7 499 705-65-31)'
    },
    {
      name: 'whitelabelSupportEmail',
      message: 'Введите email тех. поддержки для вайтлейбла. (например: help@ostrovok.ru)'
    },
    {
      name: 'whitelabelPopularDestinationsLimit',
      message: 'Введите количество популярных направлений для вайтлейбла. (например: 8)'
    },
    {
      name: 'whitelabelMainColor',
      message: 'Введите основной цвет в формате #hex. (например: #fff)'
    },
    {
      name: 'whitelabelSubColor',
      message: 'Введите дополнительный цвет в формате #hex. (например: #000)'
    },
    {
      name: 'whitelabelHeadOta',
      message: 'Шапка из островка (y/n)'
    },
    {
      name: 'whitelabelFootOta',
      message: 'Футер из островка (y/n)'
    },
    {
      name: 'whitelabelShowBanners',
      message: 'Показывать блок баннеров на главной (y/n)'
    },
    {
      name: 'whitelabelShowChat',
      message: 'Показывать чат (y/n)'
    },
    {
      name: 'whitelabelShowAccountBlock',
      message: 'Показывать блок аккаунта (y/n)'
    }
  ];

  this.prompt(prompts, function (props) {
    this.whitelabelName = props.whitelabelName;
    this.whitelabelDomain = props.whitelabelDomain;
    this.whitelabelTitle = props.whitelabelTitle;
    this.whitelabelSupportPhone = props.whitelabelSupportPhone;
    this.whitelabelSupportEmail = props.whitelabelSupportEmail;
    this.whitelabelPopularDestinationsLimit = props.whitelabelPopularDestinationsLimit;
    this.whitelabelMainColor = props.whitelabelMainColor;
    this.whitelabelSubColor = props.whitelabelSubColor;
    this.whitelabelHeadOta = props.whitelabelHeadOta === 'y' ? true : false;
    this.whitelabelFootOta = props.whitelabelFootOta === 'y' ? true : false;
    this.whitelabelShowBanners = props.whitelabelShowBanners === 'y' ? true : false;
    this.whitelabelShowChat = props.whitelabelShowChat === 'y' ? true : false;
    this.whitelabelShowAccountBlock = props.whitelabelShowAccountBlock === 'y' ? true : false;
    cb();
  }.bind(this));
};

WhitelabelGenerator.prototype.app = function app() {
  this.mkdir('partners/' + this.whitelabelName + '/mail');

  this.template('mail/reservation-multi-en.html', 'partners/' + this.whitelabelName + '/mail/reservation-multi-en.html');
  this.template('mail/reservation-multi-ru.html', 'partners/' + this.whitelabelName + '/mail/reservation-multi-ru.html');
  this.template('mail/reservation-single-en.html', 'partners/' + this.whitelabelName + '/mail/reservation-single-en.html');
  this.template('mail/reservation-single-ru.html', 'partners/' + this.whitelabelName + '/mail/reservation-single-ru.html');

  this.template('whitelabelname.html', 'partners/' + this.whitelabelName + '/' + this.whitelabelName + '.html');
  this.copy('whitelabelname.scss', 'partners/' + this.whitelabelName + '/' + this.whitelabelName + '.scss');

  this.template('footer.html', 'partners/' + this.whitelabelName + '/footer.html');
  this.copy('footer.scss', 'partners/' + this.whitelabelName + '/footer.scss');

  this.template('header.html', 'partners/' + this.whitelabelName + '/header.html');
  this.copy('header.scss', 'partners/' + this.whitelabelName + '/header.scss');

  this.template('order.complete.html', 'partners/' + this.whitelabelName + '/order.complete.html');
  this.copy('order.complete.scss', 'partners/' + this.whitelabelName + '/order.complete.scss');
};
