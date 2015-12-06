(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdCreative', dependencies, factory);
}(this, function(CrudObject, Archivable) {
  'use strict';

  var endpoint = 'adcreatives';
  var fields = [
    'actor_id',
    'actor_image_hash',
    'actor_name',
    'adlabels',
    'applink_treatment',
    'body',
    'call_to_action_type',
    'dynamic_ad_voice',
    'filename',
    'follow_redirect',
    'id',
    'image_crops',
    'image_file',
    'image_hash',
    'image_url',
    'instagram_actor_id',
    'instagram_permalink_url',
    'link_deep_link_url',
    'link_url',
    'name',
    'object_id',
    'object_store_url',
    'object_story_id',
    'object_story_spec',
    'object_type',
    'object_url',
    'place_page_set_id',
    'preview_url',
    'product_set_id',
    'template_url',
    'thumbnail_url',
    'title',
    'url_tags',
    'video_id',
  ];

  /**
   * An instance of a specific creative which is being used to define the creative field of one or more ad groups.
   * @see {@link} https://developers.facebook.com/docs/marketing-api/adcreative
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function AdCreative(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    Archivable.call(_this, 'status');

    /**
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdPreviews = function(params) {
      return _this.getManyByConnection(api.AdPreview, null, params);
    };

    return _this;
  }

  AdCreative.getEndpoint = function() { return endpoint; };
  AdCreative.getFields = function() { return fields; };

  return AdCreative;
}));
