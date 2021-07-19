$(document).ready(function() {
    $('body').addClass("swell-rewards-page");
    $("body").on("click", ".close-thank-you", function(){
      $(".swell-post-checkout").remove();
    });

    $("body").on("click", "#swell-referral-refer-submit", function(){
      $(".swell-checkout-thanks").hide();
    });

    $("body").on("click", ".swell-referral-thanks .swell-referral-back-link", function(){
      $(".swell-checkout-thanks").show();
    });
    
    $('body').on('click', '.logged-in.swell-newsletter', function(){
      swellAPI.showPopupByType("EmailCapturePopup"); 
    });
  $(document).on("swell:setup", function() {

    $(".swell-post-checkout").css("display","flex");
    $(".fa_spinner").css("display","none");

    Swell.Referral.initializeReferral(".swell-referral",SwellConfig.Referral.opts);
    SwellConfig.Referral.populateReferrals();
    Swell.Redemption.initializeProductRedemptions(".swell-redemption-option-list",SwellConfig.Redemption.opts);
    SwellConfig.Redemption.hideRedemptionOption();
    SwellConfig.Redemption.activateProductRedemptionOption();
    applySlickSlider('.swell-redemption-option-list');
    Swell.Campaign.initializeCampaigns(".swell-campaign-list", SwellConfig.Campaign.opts);
    SwellConfig.Campaign.hideCampaign();
    SwellConfig.Campaign.addCampaign();
    SwellConfig.Tier.initializeCustomTierProperties();
    SwellConfig.Tier.initializeTiers(".swell-tier-list");
    SwellConfig.Tier.setupStatus();

    if(spapi.isMobile){
      applytierSlickSlider('.swell-tier-list');
    }
    if(spapi.authenticated){
      $(".swell-newsletter").addClass("logged-in");
    }
  });

   $(document).on("swell:referral:success", function() {
    swellAPI.refreshCustomerDetails(function() {
      var customerDetails = swellAPI.getCustomerDetails();
      referrals = customerDetails.referrals;  
      $(".table-data").html("");
      SwellConfig.Referral.populateReferrals();
    });
   });

   $(document).on("swell:referral:error", function(jqXHR, textStatus, errorThrown) {
    if(textStatus && (textStatus === "Please enter a valid email address" || textStatus === "EMAILS_ALREADY_PURCHASED")){
      if (!$(".refer-customer-error")[0]) {
        $('<p class=\"refer-customer-error\">Email address is already associated with an account.</p>').insertBefore($("#swell-referral-refer-emails").parent().parent());
        $("#swell-referral-refer-emails").parent().parent().addClass("error-border");
      }
    }
   });

 });

(function() {
   window.SwellConfig = window.SwellConfig || {};

   SwellConfig.Referral = {
      opts: {
         localization: {
          referralSidebarDetailsAction: "",
          referralSidebarDetailsReward: "",

          referralRegisterHeading: "<span class='refer-friend-heading'>Refer a friend</span>Give $15, Get $15",
          referralRegisterDetails: "Give your friends $15 off on their first order of $100+ and get $15 in points for each friend that completes a purchase.*",
          referralRegisterFormDetails: "Enter your email to get started.",
          referralRegisterFormEmail: "Enter your email address",
          referralRegisterFormSubmit: "<i class='swell-icon-arrow-right'> </i>",
          referralRegisterFooter: "<div class='swell-refer-footer'>*The friend must be a new customer, have purchased through your referral link, and placed and order of $100+ for you to receive your $15 reward.</div>",


          referralReferHeading: "<span class='refer-friend-heading'>Refer a friend</span>Give $15, Get $15",
          referralReferFooter: "<div class='swell-refer-footer'>*The friend must be a new customer, have purchased through your referral link, and placed and order of $100+ for you to receive your $15 reward.</div>",
          referralReferDetails: "Give your friends $15 off on their first order of $100+ and get $15 in points for each friend that completes a purchase.*",
          referralReferFormSubmit: "<i class='swell-icon-arrow-right'> </i>",
          referralReferFormDetails: "Now, enter your friends' emails.",
          referralReferFormEmailsDetails: "Enter your friends' emails (separated by commas)",

          referralReferMediaDetails: "You can also share your link with the buttons below.",

          referralShareFacebook: "Share",
          referralShareMessenger: "Message",
          referralShareTwitter: "Tweet",
          referralShareSMS: "SMS",
          referralShareCopy: "Copy Link",

          referralFacebookIcon: "swell-icon-Fb",
          referralMessengerIcon: "swell-icon-Message",
          referralTwitterIcon: "swell-icon-twitter-1",
          referralLinkIcon: "swell-icon-Copy-link",
          referralSMSIcon: "swell-icon-SMS",

          referralThanksHeading: "Thanks for Referring!",
          referralThanksDetails: "Remind your friends to check their emails.",

          referralCopyHeading: "",
          referralCopyButton: "Copy link",
          referralCopyDetails: "Copy link and share with your friends"
        },
        templates: {
          referralCopy: '<div class="swell-referral-copy"> <div class="swell-referral-copy-content"> <div class="swell-referral-copy-sidebar"> <div class="swell-copy-img"><img src="//cdn.shopify.com/s/files/1/0032/3423/4479/t/309/assets/swell-referral-copy-image.png?v=5663846799600850190"></div> </div> <div class="swell-referral-copy-main"> <span class="swell-referral-back-link"></span> <div class="swell-referral-form-wrapper"> <div class="swell-referral-copy-link swell-referral-link cross-link-circle" id="swell-referral-copy-link"></div> <button class="swell-referral-copy-button" id="swell-referral-copy-button" data-clipboard-target="#swell-referral-copy-link"> <%= localization.referralCopyButton %> </button> <p class="swell-referral-details"> <%= localization.referralCopyDetails %> </p> </div> </div> </div> <div> </div> </div>',
          referralRefer: '<div class="swell-referral-refer"> <h2 class="swell-referral-heading"><%= localization.referralReferHeading %></h2> <p class="swell-referral-details"><%= localization.referralReferDetails %></p> <div class="swell-referral-form-wrapper"> <form class="swell-referral-form" name="swell-referral-refer-form" id="swell-referral-refer-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralReferFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" type="text" name="swell-referral-refer-emails" id="swell-referral-refer-emails" required="required" placeholder="<%= localization.referralReferFormEmailsDetails %>"> </li> <li class="swell-referral-form-list-field"> <button class="swell-referral-form-list-submit" type="submit" name="swell-referral-refer-submit" id="swell-referral-refer-submit"><%= localization.referralReferFormSubmit %> </button> </li> </ul> </div> </form> </div> <div class="swell-referral-media-wrapper"> <p class="swell-referral-media-details"><%= localization.referralReferMediaDetails %></p> <ul class="swell-referral-media-list"> <li class="swell-referral-medium swell-share-referral-facebook"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralFacebookIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareFacebook %> </div> </li> <li class="swell-referral-medium swell-share-referral-twitter"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralTwitterIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareTwitter %> </div> </li> <li class="swell-referral-medium swell-share-referral-sms"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralSMSIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareSMS %> </div> </li> <li class="swell-referral-medium swell-share-referral-messenger"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralMessengerIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareMessenger %> </div> </li> <li class="swell-referral-medium swell-share-referral-copy"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralLinkIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareCopy %> </div> </li> </ul> </div><%= localization.referralReferFooter %> </div>',
          referralRegister: '<div class="swell-referral-register"> <h2 class="swell-referral-heading"><%= localization.referralRegisterHeading %></h2> <p class="swell-referral-details"><%= localization.referralRegisterDetails %></p> <div class="swell-referral-form-wrapper"> <form name="swell-referral-register-form" id="swell-referral-register-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralRegisterFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" type="email" name="swell-referral-register-email" id="swell-referral-register-email" required="required" placeholder="<%= localization.referralRegisterFormEmail %>"> </li> <li class="swell-referral-form-list-field"> <button class="swell-referral-form-list-submit" type="submit" name="swell-referral-register-submit" id="swell-referral-register-submit"> <%= localization.referralRegisterFormSubmit %> </button> </li> </ul> </div> </form> </div><%= localization.referralReferFooter %> </div>'
        }
      
      },
      populateReferrals: function(){
         if (spapi.authenticated) {
            var referral_receipts = spapi.customer.referral_receipts;
            $('.table-data tr').remove();
            referral_receipts.forEach(function(referral_receipt) {
               var email = referral_receipt.email;
               var completed_at = referral_receipt.completed_at;
               if (completed_at) {
                  status = "Purchased (" + spapi.activeReferralCampaign.reward_text + ")";
               } else {
                  status = 'Invited';
               }
               $(".table-data").append("<tr><td>" + email + "</td><td>" + status + "</td></tr>");
            });
         }
      }
   };

}).call(this);

(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Redemption = {
    opts: {
      templates: {
        redemptionOptionProduct: "<li class='swell-redemption-option'> <div class='swell-redemption-option-content' data-redemption-option-id='<%= redemption.id %>' > <div class='swell-redemption-option-image-holder'> <img src='<%= redemption.background_image_url %>'> </div> <div class='swell-redemption-option-value'> <%= redemption.name %> </div> <div class='swell-redemption-option-cost'> <%= redemption.cost_text %> </div> <a class='swell-redemption-button swell-link-redeem' data-variant-id='<%= redemption.applies_to_id %>' data-redemption-option-id='<%= redemption.id %>' href='javascript:void(0)'>Redeem Now</a> </div> </li>"
      }
    },
    hideRedemptionOption: function(){
      $('.swell-redemption-option div[data-redemption-option-id="299075"]').parent().remove();
    },
    activateProductRedemptionOption : function(){
      var redemptionOptions = spapi.activeRedemptionOptions;
      if (spapi.authenticated) {
        var pointbalance = spapi.customer.adjusted_points_balance;
        redemptionOptions.forEach(function(product,index){  
            $( ".swell-redemption-option-list li:eq("+index+")" ).find(".swell-link-redeem").addClass("swell-buy-product-btn");
        });
        swellAPI.refreshEmbeds();
      }else{
        $(".swell-link-redeem").addClass("disable");
      }
    }
  };

}).call(this);


(function() {
  window.SwellConfig = window.SwellConfig || {};
  SwellConfig.Campaign = {
    opts: {
      templates: {
        campaign: '<li class="swell-campaign"> <div class="swell-campaign-content" data-display-mode="modal" data-campaign-id="<%= campaign.id %>"> <div class="swell-campaign-icon"> <span class="swell-campaign-icon-content"> <i class="<%= campaign.icon %>"> <span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span></i> </span> </div> <div class="swell-campaign-type"> <span class="swell-campaign-type-content"><%= campaign.reward_text %></span> </div> <div class="swell-campaign-value"> <span class="swell-campaign-value-content"><%= campaign.title %></span> </div> </div> </li>',
      }
    },
    hideCampaign: function(){
      $(".swell-campaign div[data-campaign-id = '468567']").parent().remove();
      $(".swell-campaign div[data-campaign-id = '495530']").parent().remove();
    },
    addCampaign: function(){
      $(".swell-campaign:nth-child(6)").after('<li class="swell-campaign"> <div class="swell-campaign-content swell-newsletter"> <div class="swell-campaign-icon"> <span class="swell-campaign-icon-content"> <i class="swell-icon-newsletter"></i> </span> </div> <div class="swell-campaign-type"> <span class="swell-campaign-type-content">10 Points</span> </div> <div class="swell-campaign-value"> <span class="swell-campaign-value-content">Newsletter Sign Up</span> </div> </div> </li>');
    }
  };
}).call(this);


(function() {
  window.SwellConfig = window.SwellConfig || {};
  SwellConfig.Tier = {
    getCustomerTierRank : function(id) {
      tiers = spapi.activeVipTiers;
      rank = 1;
      tiers.forEach(function(tier){
        if(tier.id === id){
          rank = tier.rank;
        }
      });
      return rank;
    },
    getTierByRank: function (rank) {
      var tiers;
      tiers = spapi.activeVipTiers;
      return $.grep(tiers, function (e) {
        return e.rank === rank;
      })[0];
    },
    initializeCustomTierProperties: function() {
      var tiers = spapi.activeVipTiers;
      var tier;
      if(tiers.length>0){
        tier=SwellConfig.Tier.getTierByRank(0);
        tier.class = "tier0"; 
        tier.image_url = "//cdn.shopify.com/s/files/1/0032/3423/4479/t/309/assets/swell-vip-tier-travel-crcle.png?v=5366054387495254248"; 
        // tier.image_url = "//cdn.shopify.com/s/files/1/0032/3423/4479/t/309/assets/swell-tier-img-1.png?v=4829494046237431335"; 
        tier.spend_per_year = "$"+((tier.amount_spent_cents)/100) + " - $"+(((SwellConfig.Tier.getTierByRank(1).amount_spent_cents)/100)-1)+""; 
        tier.points_multiplier = "1"; 
        tier.birthday_gift = ""; 
        tier.free_shipping = ""; 
        tier.early_sales_access = "Exchange points for discounts"; 
        tier.early_arrivals_access = ""; 
      }
      if(tiers.length>1){
        tier=SwellConfig.Tier.getTierByRank(1);
        tier.class = "tier1"; 
        tier.image_url = "//cdn.shopify.com/s/files/1/0032/3423/4479/t/309/assets/swell-vip-tier-travel-crcle.png?v=5366054387495254248"; 
        tier.spend_per_year = "$"+((tier.amount_spent_cents)/100) + " - $"+(((SwellConfig.Tier.getTierByRank(2).amount_spent_cents)/100)-1)+""; 
        tier.points_multiplier = "1.5"; 
        tier.birthday_gift = ''; 
        tier.free_shipping = ""; 
        tier.early_sales_access = 'Early access to new products and limited edition products'; 
        tier.early_arrivals_access = '';  
      }
      if(tiers.length>2){
        tier=SwellConfig.Tier.getTierByRank(2);
        tier.class = "tier2"; 
        tier.image_url = "//cdn.shopify.com/s/files/1/0032/3423/4479/t/309/assets/swell-vip-tier-travel-crcle.png?v=5366054387495254248"; 
        tier.spend_per_year = ("$"+(tier.amount_spent_cents/100)+"+"); 
        tier.points_multiplier = '2'; 
        tier.birthday_gift = ''; 
        tier.free_shipping = "Free shipping"; 
        tier.early_sales_access = 'Redeem exclusive products only available to this tier using points'; 
        tier.early_arrivals_access = 'Early access to new products and limited edition products'; 
      }
    },
    initializeTiers: function(containerSelector) {
      if ($(containerSelector).length === 0) {
        return "";
      }
      tiers = spapi.activeVipTiers;
      var tier;
      for (i = 0; i < tiers.length; i++) {
        tier = SwellConfig.Tier.getTierByRank(i);
        $(containerSelector).append('<li class="list-items '+tier.class+'" data-tier-id="'+tier.id+'"> <div class="items-holder"> <div class="items-heading-holder"> <img src="'+tier.image_url+'"> <div class="name">'+tier.name+'</div> <div class="tier_spend">'+tier.spend_per_year+'</div> <div class="swell-border"></div> <div class="points-multiplier">'+tier.points_multiplier+'X<span>Point Multiplier</span></div> </div> <ul class="point-holder"> <li>'+tier.early_sales_access+'</li>  <li>'+tier.free_shipping+'</li> <li>'+tier.early_arrivals_access+'</li> <li>'+tier.birthday_gift+'</li></ul> </div> </li>');
      }
    },
    setupStatus: function(){
      if(spapi.authenticated && spapi.customer && spapi.customer.vip_tier ){
        tiers = spapi.activeVipTiers;
        if(spapi.customer.vip_tier){
          // assuming that the rank started from 0;
          customerRank = SwellConfig.Tier.getCustomerTierRank(spapi.customer.vip_tier.id);
          if(customerRank < 2){
            next_tier = SwellConfig.Tier.getTierByRank(customerRank+1);
            dollarRequired = (next_tier.amount_spent_cents - spapi.customer.vip_tier_stats.amount_spent_cents)/100;
            $('.swell-tier-list li[data-tier-id="'+spapi.customer.vip_tier.id+'"]').prepend('<div class="swell-tier-status"> <span>Current Status</span> <span class="next-tier"> Spend $'+dollarRequired+' more to earn '+next_tier.name+' </span></div>');  
          }
          else{
            $('.swell-tier-list li[data-tier-id="'+spapi.customer.vip_tier.id+'"]').prepend('<div class="swell-tier-status"> <span>Current Status</span> </div>');  
          }
          $('.swell-tier-list li[data-tier-id="'+spapi.customer.vip_tier.id+'"]').addClass("active");
        }else{
          next_tier = SwellConfig.Tier.getTierByRank(0);
          dollarRequired = (next_tier.amount_spent_cents - spapi.customer.vip_tier_stats.amount_spent_cents)/100;         
          $('.swell-tier-list li[data-tier-id="'+next_tier.id+'"]').prepend('<div class="swell-tier-status"><span class="next-tier"> Spend $'+dollarRequired+' more to earn '+next_tier.name+' </span></div>');  
          $('.swell-tier-list li[data-tier-id="'+next_tier.id+'"]').addClass("active");
        }
      }
    }
  };

}).call(this);

applySlickSlider = function(containerSelector){
  $(containerSelector).slick({
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    prevArrow: '<svg class="swell-svg-right-arrow left" width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com --> <title>https://beistravel.com/https://beistravel.com/</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-arrow-right" fill="#000000" fill-rule="nonzero"> <g transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) " id="Path"> <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623"></polygon> </g> </g> </g> </svg>',
    nextArrow: '<svg class="swell-svg-right-arrow right" width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com --> <title>https://beistravel.com/https://beistravel.com/</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-arrow-right" fill="#000000" fill-rule="nonzero"> <g transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) " id="Path"> <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623"></polygon> </g> </g> </g> </svg>',
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      }
   ]
  });
}

applytierSlickSlider = function(containerSelector){
  $(containerSelector).slick({
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<svg class="swell-svg-right-arrow left" width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com --> <title>https://beistravel.com/https://beistravel.com/</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-arrow-right" fill="#000000" fill-rule="nonzero"> <g transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) " id="Path"> <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623"></polygon> </g> </g> </g> </svg>',
    nextArrow: '<svg class="swell-svg-right-arrow right" width="53px" height="53px" viewBox="0 0 53 53" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <!-- Generator: Sketch 53.2 (72643) - https://sketchapp.com --> <title>https://beistravel.com/https://beistravel.com/</title> <desc>Created with Sketch.</desc> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="icon-arrow-right" fill="#000000" fill-rule="nonzero"> <g transform="translate(26.500000, 26.500000) rotate(90.000000) translate(-26.500000, -26.500000) " id="Path"> <polygon points="27.174 4.155 27.174 53 24.928 53 24.928 4.155 1.572 27.623 0 26.051 26.051 0 52.1 26.051 50.64 27.623"></polygon> </g> </g> </g> </svg>',
  });
}

