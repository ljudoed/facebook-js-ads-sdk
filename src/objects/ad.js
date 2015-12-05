(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Ad', dependencies, factory);
}(this, function(CrudObject, Archivable) {
  'use strict';

  var endpoint = 'ads';
  var fields = [
    'account_id',
    'ad_review_feedback',
    'adlabels',
    'bid_amount',
    'bid_info',
    'campaign_group_id',
    'adset_id',
    'conversion_specs',
    'created_time',
    'creative',
    'failed_delivery_checks',
    'id',
    'name',
    'redownload',
    'social_prefs',
    'status',
    'tracking_specs',
    'updated_time',
    'view_tags',
  ];

  /**
   * Contains the data necessary for an ad, such as creative elements and campaign information.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adgroup
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function Ad(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    Archivable.call(_this, 'status');

    /**
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdPreviews = function(params) {
      return _this.getManyByConnection(api.AdPreview, null, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdStatistics = function(fields, params) {
      return _this.getOneByConnection(api.AdStatistics, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getReachEstimate = function(fields, params) {
      return _this.getOneByConnection(api.ReachEstimate, fields, params);
    };

    return _this;
  }

  Ad.getEndpoint = function() { return endpoint; };
  Ad.getFields = function() { return fields; };

  return Ad;
}));
