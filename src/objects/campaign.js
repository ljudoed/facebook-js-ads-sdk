(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/object-validation',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.Campaign', dependencies, factory);
}(this, function(CrudObject, ObjectValidation, Archivable) {
  'use strict';

  var endpoint = 'campaigns';
  var fields = [
    'id',
    'account_id',
    'objective',
    'name',
    'is_completed',
    'buying_type',
    'promoted_object',
    'spend_cap',
    'adlabels',
    'created_time',
    'start_time',
    'stop_time',
    'updated_time'
    'configured_status',
    'effective_status',
  ];

  /**
   * Group of Ad Sets
   * @see {@link} https://developers.facebook.com/docs/reference/ads-api/adcampaign
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function Campaign(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    ObjectValidation.call(_this);
    Archivable.call(_this, 'status');

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdSets = function(fields, params) {
      return _this.getManyByConnection(api.AdSet, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAds = function(fields, params) {
      return _this.getManyByConnection(api.Ad, fields, params);
    };

    return _this;
  }

  Campaign.getEndpoint = function() { return endpoint; };
  Campaign.getFields = function() { return fields; };

  return Campaign;
}));
