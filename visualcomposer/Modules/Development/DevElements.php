<?php

namespace VisualComposer\Modules\Development;

use VisualComposer\Framework\Container;
use VisualComposer\Framework\Illuminate\Support\Module;
use VisualComposer\Helpers\Options;
use VisualComposer\Helpers\Traits\WpFiltersActions;
use VisualComposer\Helpers\Url;

class DevElements extends Container implements Module
{
    use WpFiltersActions;

    public function __construct()
    {
        if (vcvenv('VCV_DEV_ELEMENTS')) {
            $this->wpAddAction(
                'init',
                'dummySetElements'
            );
        }
    }

    /**
     * @param \VisualComposer\Helpers\Options $optionHelper
     * @param \VisualComposer\Helpers\Url $urlHelper
     */
    protected function dummySetElements(Options $optionHelper, Url $urlHelper)
    {
        $optionHelper->set(
            'hubElements',
            [
                'row' => [
                    'bundlePath' => $urlHelper->to('devElements/row/public/dist/element.bundle.js'),
                    'elementPath' => $urlHelper->to('devElements/row/row/'),
                    'assetsPath' => $urlHelper->to('devElements/row/row/public/'),
                    'settings' => [
                        'name' => 'Row',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/row/row/public/thumbnail-row-column.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/row/row/public/preview-row-column.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Row and Column are the basic structural element for building an initial content structure by adding rows and dividing them into columns. You can insert other content elements into columns.',
                    ],
                ],
                'column' => [
                    'bundlePath' => $urlHelper->to('devElements/column/public/dist/element.bundle.js'),
                    'elementPath' => $urlHelper->to('devElements/column/column/'),
                    'assetsPath' => $urlHelper->to('devElements/column/column/public/'),
                    'settings' => [
                        'name' => 'Column',
                        'metaThumbnailUrl' => '',
                        'metaPreviewUrl' => '',
                        'metaDescription' => '',
                    ],
                ],
                'textBlock' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/textBlock/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/textBlock/textBlock/'),
                    'assetsPath' => $urlHelper->to('devElements/textBlock/textBlock/public'),
                    'settings' => [
                        'name' => 'Text Block',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/textBlock/textBlock/public/thumbnail-text-block.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/textBlock/textBlock/public/preview-text-block.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Simple text editor for working with static text, including paragraphs, titles, bullets and even media. Simple text block is a copy of default WordPress editor.',
                    ],
                ],
                'basicButton' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/basicButton/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/basicButton/basicButton/'),
                    'assetsPath' => $urlHelper->to('devElements/basicButton/basicButton/public/'),
                    'settings' => [
                        'name' => 'Basic Button',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/basicButton/basicButton/public/thumbnail-basic-button.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/basicButton/basicButton/public/preview-basic-button.png'
                        ),
                        'metaDescription' => 'Basic flat style button with hover effect to catch visitor\'s attention.',
                    ],
                ],
                'outlineButton' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/outlineButton/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/outlineButton/outlineButton/'),
                    'assetsPath' => $urlHelper->to('devElements/outlineButton/outlineButton/public/'),
                    'settings' => [
                        'name' => 'Outline Button',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/outlineButton/outlineButton/public/outline-button-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/outlineButton/outlineButton/public/outline-button-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Simple outline button with solid fill on hover. Great solution to be used as a secondary button within a website.',
                    ],
                ],
                'youtubePlayer' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/youtubePlayer/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/youtubePlayer/youtubePlayer/'),
                    'assetsPath' => $urlHelper->to('devElements/youtubePlayer/youtubePlayer/public/'),
                    'settings' => [
                        'name' => 'Youtube Player',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/youtubePlayer/youtubePlayer/public/youtube-player-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/youtubePlayer/youtubePlayer/public/youtube-player-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'YouTube player allows you to display video from YouTube on your website by simply copy/paste link to the video.',
                    ],
                ],
                'vimeoPlayer' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/vimeoPlayer/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/vimeoPlayer/vimeoPlayer/'),
                    'assetsPath' => $urlHelper->to('devElements/vimeoPlayer/vimeoPlayer/public/'),
                    'settings' => [
                        'name' => 'Vimeo Player',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/vimeoPlayer/vimeoPlayer/public/vimeo-player-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/vimeoPlayer/vimeoPlayer/public/vimeo-player-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Vimeo player allows you to display video from Vimeo on your website by simply copy/paste link to the video.',
                    ],
                ],
                'singleImage' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/singleImage/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/singleImage/singleImage/'),
                    'assetsPath' => $urlHelper->to('devElements/singleImage/singleImage/public/'),
                    'settings' => [
                        'name' => 'Single Image',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/singleImage/singleImage/public/thumbnail-single-image.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/singleImage/singleImage/public/preview-single-image.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Single image is a basic element for adding images from Media Library into the content area. Single image element includes controls for image manipulations.',
                    ],
                ],
                'heroSection' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/heroSection/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/heroSection/heroSection/'),
                    'assetsPath' => $urlHelper->to('devElements/heroSection/heroSection/public/'),
                    'settings' => [
                        'name' => 'Hero Section',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/heroSection/heroSection/public/thumbnail-hero-section.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/heroSection/heroSection/public/preview-hero-section.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Hero section with image background and \'Call to Action\' message with a switchable button and position controls.',
                    ],
                ],
                'icon' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/icon/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/icon/icon/'),
                    'assetsPath' => $urlHelper->to('devElements/icon/icon/public/'),
                    'settings' => [
                        'name' => 'Icon',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/icon/icon/public/thumbnail-icon.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/icon/icon/public/preview-icon.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Simple icon element with various icons from library and background shape control options.',
                    ],
                ],
                'googleFontsHeading' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/googleFontsHeading/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/googleFontsHeading/googleFontsHeading/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/googleFontsHeading/googleFontsHeading/public/'
                    ),
                    'settings' => [
                        'name' => 'Google Fonts Heading',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googleFontsHeading/googleFontsHeading/public/google-fonts-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googleFontsHeading/googleFontsHeading/public/google-fonts-preview.png'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Selected Google Fonts with additional styling allows adding eye-catching titles and call to action messages.',
                    ],
                ],
                'wpWidgetsCustom' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/wpWidgetsCustom/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/wpWidgetsCustom/wpWidgetsCustom/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/wpWidgetsCustom/wpWidgetsCustom/public/'
                    ),
                    'settings' => [
                        'name' => 'Wordpress Custom Widget',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/wpWidgetsCustom/wpWidgetsCustom/public/custom-widgets-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/wpWidgetsCustom/wpWidgetsCustom/public/custom-widgets-preview.png'
                        ),
                        'metaDescription' => 'Choose, configure and add custom widgets to your site.',
                    ],
                ],
                'wpWidgetsDefault' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/wpWidgetsDefault/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/wpWidgetsDefault/wpWidgetsDefault/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/wpWidgetsDefault/wpWidgetsDefault/public/'
                    ),
                    'settings' => [
                        'name' => 'Wordpress Default Widget',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/wpWidgetsDefault/wpWidgetsDefault/public/wordpress-widgets-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/wpWidgetsDefault/wpWidgetsDefault/public/wordpress-widgets-preview.png'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Choose, configure and add any of WordPress default widgets to your site.',
                    ],
                ],
                'shortcode' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/shortcode/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/shortcode/shortcode/'),
                    'assetsPath' => $urlHelper->to('devElements/shortcode/shortcode/public/'),
                    'settings' => [
                        'name' => 'Shortcode',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/shortcode/shortcode/public/shortcode-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/shortcode/shortcode/public/shortcode-preview.png'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add any shortcode available on your WordPress site to the layout.',
                    ],
                ],
                'rawHtml' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/rawHtml/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to('devElements/rawHtml/rawHtml/'),
                    'assetsPath' => $urlHelper->to('devElements/rawHtml/rawHtml/public/'),
                    'settings' => [
                        'name' => 'Raw HTML',
                        'metaThumbnailUrl' => $urlHelper->to(
                            'devElements/rawHtml/rawHtml/public/raw-html-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                            'devElements/rawHtml/rawHtml/public/raw-html-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add your own custom HTML code to WordPress website via raw code block that accepts HTML.',
                    ],
                ],
                // 'doubleOutlineButton' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/doubleOutlineButton/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/doubleOutlineButton/doubleOutlineButton/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/doubleOutlineButton/doubleOutlineButton/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Double Outline Button',
                //         'metaThumbnailUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/doubleOutlineButton/doubleOutlineButton/public/double-outline-button-thumbnail.jpg'
                //         ),
                //         'metaPreviewUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/doubleOutlineButton/doubleOutlineButton/public/double-outline-button-preview.jpg'
                //         ),
                //         // @codingStandardsIgnoreLine
                //         'metaDescription' => 'Double outline button with solid color hover. Great solution for light and dark websites to keep website design consistent.',
                //     ],
                // ],
                'facebookLike' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/facebookLike/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/facebookLike/facebookLike/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/facebookLike/facebookLike/public/'
                    ),
                    'settings' => [
                        'name' => 'Facebook Like',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/facebookLike/facebookLike/public/facebook-like-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/facebookLike/facebookLike/public/facebook-like-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add Facebook Like button to your WordPress website for quick content sharing on Facebook.',
                    ],
                ],
                'feature' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/feature/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/feature/feature/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/feature/feature/public/'
                    ),
                    'settings' => [
                        'name' => 'Feature',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/feature/feature/public/thumbnail-feature.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/feature/feature/public/preview-feature.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Feature element with an icon, title and description. Icon element contains controls for various background shapes.',
                    ],
                ],
                'featureSection' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/featureSection/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/featureSection/featureSection/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/featureSection/featureSection/public/'
                    ),
                    'settings' => [
                        'name' => 'Feature Section',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/featureSection/featureSection/public/thumbnail-feature-section.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/featureSection/featureSection/public/preview-feature-section.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Feature section divided into image and content columns. Great for representing product features or company services.',
                    ],
                ],
                'flickrImage' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/flickrImage/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/flickrImage/flickrImage/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/flickrImage/flickrImage/public/'
                    ),
                    'settings' => [
                        'name' => 'Flickr Image',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/flickrImage/flickrImage/public/thumbnail-flickr-image.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/flickrImage/flickrImage/public/preview-flickr-image.jpg'
                        ),
                        'metaDescription' => 'Embed Flickr image directly to your WordPress website.',
                    ],
                ],
                'googleMaps' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/googleMaps/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/googleMaps/googleMaps/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/googleMaps/googleMaps/public/'
                    ),
                    'settings' => [
                        'name' => 'Google Maps',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googleMaps/googleMaps/public/google-maps-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googleMaps/googleMaps/public/google-maps-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add basic Google Maps via embed code to your WordPress website to display location.',
                    ],
                ],
                'googlePlusButton' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/googlePlusButton/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/googlePlusButton/googlePlusButton/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/googlePlusButton/googlePlusButton/public/'
                    ),
                    'settings' => [
                        'name' => 'Google Plus Button',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googlePlusButton/googlePlusButton/public/google-plus-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/googlePlusButton/googlePlusButton/public/google-plus-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add standard Google Plus button to your WordPress website for quick content sharing on Google Social Network.',
                    ],
                ],
                // 'gradientButton' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/gradientButton/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/gradientButton/gradientButton/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/gradientButton/gradientButton/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Gradient Button',
                //         'metaThumbnailUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/gradientButton/gradientButton/public/gradient-button-thumbnail.jpg'
                //         ),
                //         'metaPreviewUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/gradientButton/gradientButton/public/gradient-button-preview.jpg'
                //         ),
                //         // @codingStandardsIgnoreLine
                //         'metaDescription' => 'Gradient button with gradient direction and color controls. Animated hover effects with gradient direction change.',
                //     ],
                // ],
                'imageGallery' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/imageGallery/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/imageGallery/imageGallery/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/imageGallery/imageGallery/public/'
                    ),
                    'settings' => [
                        'name' => 'Image Gallery',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/imageGallery/imageGallery/public/image-gallery-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/imageGallery/imageGallery/public/image-gallery-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Image gallery is a basic element for adding simple image gallery from Media Library into the content area.',
                    ],
                ],
                'imageMasonryGallery' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/imageMasonryGallery/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/imageMasonryGallery/imageMasonryGallery/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/imageMasonryGallery/imageMasonryGallery/public/'
                    ),
                    'settings' => [
                        'name' => 'Image Masonry Gallery',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/imageMasonryGallery/imageMasonryGallery/public/image-masonry-gallery-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/imageMasonryGallery/imageMasonryGallery/public/image-masonry-gallery-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Image masonry gallery is a gallery element for adding simple masonry image gallery from Media Library into the content area.',
                    ],
                ],
                'instagramImage' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/instagramImage/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/instagramImage/instagramImage/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/instagramImage/instagramImage/public/'
                    ),
                    'settings' => [
                        'name' => 'Instagram Image',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/instagramImage/instagramImage/public/thumbnail-instagram.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/instagramImage/instagramImage/public/preview-instagram.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Embed Instagram image directly to your WordPress website.',
                    ],
                ],
                'pinterestPinit' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/pinterestPinit/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/pinterestPinit/pinterestPinit/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/pinterestPinit/pinterestPinit/public/'
                    ),
                    'settings' => [
                        'name' => 'Pinterest Pinit',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/pinterestPinit/pinterestPinit/public/pinterest-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/pinterestPinit/pinterestPinit/public/pinterest-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add Pinterest Pinit button to your WordPress website for quick media content sharing on Pinterest.',
                    ],
                ],
                // 'postsGrid' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/postsGrid/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/postsGrid/postsGrid/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/postsGrid/postsGrid/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Posts Grid',
                //         'metaThumbnailUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/postsGrid/postsGrid/public/thumbnail.jpg'
                //         ),
                //         'metaPreviewUrl' => $urlHelper->to(
                //         // @codingStandardsIgnoreLine
                //             'devElements/postsGrid/postsGrid/public/preview.jpg'
                //         ),
                //         'metaDescription' => 'Long description',
                //     ],
                // ],
                // 'postsGridDataSourceCustomPostType' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/postsGridDataSourceCustomPostType/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourceCustomPostType/postsGridDataSourceCustomPostType/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourceCustomPostType/postsGridDataSourceCustomPostType/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Custom Post Type',
                //         'metaDescription' => '',
                //     ],
                // ],
                // 'postsGridDataSourcePage' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePage/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePage/postsGridDataSourcePage/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePage/postsGridDataSourcePage/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Pages',
                //         'metaDescription' => '',
                //     ],
                // ],
                // 'postsGridDataSourcePost' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePost/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePost/postsGridDataSourcePost/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/postsGridDataSourcePost/postsGridDataSourcePost/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Posts',
                //         'metaDescription' => '',
                //     ],
                // ],
                // 'postsGridItemPostDescription' => [
                //     'bundlePath' => $urlHelper->to(
                //         'devElements/postsGridItemPostDescription/public/dist/element.bundle.js'
                //     ),
                //     'elementPath' => $urlHelper->to(
                //         'devElements/postsGridItemPostDescription/postsGridItemPostDescription/'
                //     ),
                //     'assetsPath' => $urlHelper->to(
                //         'devElements/postsGridItemPostDescription/postsGridItemPostDescription/public/'
                //     ),
                //     'settings' => [
                //         'name' => 'Outline Button',
                //         'metaDescription' => '',
                //     ],
                // ],
                'rawJs' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/rawJs/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/rawJs/rawJs/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/rawJs/rawJs/public/'
                    ),
                    'settings' => [
                        'name' => 'Raw JS',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/rawJs/rawJs/public/raw-js-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/rawJs/rawJs/public/raw-js-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add your own custom Javascript code to WordPress website to execute it on this particular page.',
                    ],
                ],
                'separator' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/separator/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/separator/separator/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/separator/separator/public/'
                    ),
                    'settings' => [
                        'name' => 'Separator',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/separator/separator/public/thumbnail-separator.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/separator/separator/public/preview-separator.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Double line separator with different line length - calculated automatically. ',
                    ],
                ],
                'twitterButton' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/twitterButton/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/twitterButton/twitterButton/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/twitterButton/twitterButton/public/'
                    ),
                    'settings' => [
                        'name' => 'Twitter Button',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterButton/twitterButton/public/tweet-button-thumbnail.jpg'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterButton/twitterButton/public/tweet-button-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Add standard Tweet button to your WordPress website for quick content sharing on Twitter.',
                    ],
                ],
                'twitterGrid' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/twitterGrid/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/twitterGrid/twitterGrid/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/twitterGrid/twitterGrid/public/'
                    ),
                    'settings' => [
                        'name' => 'Twitter Grid',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterGrid/twitterGrid/public/twitter-grid-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterGrid/twitterGrid/public/twitter-grid-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Showcase Twitter stories that are primarily told with photos, videos, GIFs, and Vines.',
                    ],
                ],
                'twitterTimeline' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/twitterTimeline/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/twitterTimeline/twitterTimeline/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/twitterTimeline/twitterTimeline/public/'
                    ),
                    'settings' => [
                        'name' => 'Twitter Timeline',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterTimeline/twitterTimeline/public/twitter-timeline-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterTimeline/twitterTimeline/public/twitter-timeline-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Embedded timeline to display a stream of Tweets on your site. Use it to showcase profiles, lists, and favorites, as well as the stories.',
                    ],
                ],
                'twitterTweet' => [
                    'bundlePath' => $urlHelper->to(
                        'devElements/twitterTweet/public/dist/element.bundle.js'
                    ),
                    'elementPath' => $urlHelper->to(
                        'devElements/twitterTweet/twitterTweet/'
                    ),
                    'assetsPath' => $urlHelper->to(
                        'devElements/twitterTweet/twitterTweet/public/'
                    ),
                    'settings' => [
                        'name' => 'Twitter Tweet',
                        'metaThumbnailUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterTweet/twitterTweet/public/twitter-tweet-thumbnail.png'
                        ),
                        'metaPreviewUrl' => $urlHelper->to(
                        // @codingStandardsIgnoreLine
                            'devElements/twitterTweet/twitterTweet/public/twitter-tweet-preview.jpg'
                        ),
                        // @codingStandardsIgnoreLine
                        'metaDescription' => 'Embedded Tweet to display an individual Tweet off of Twitter by picking tweet URL.',
                    ],
                ],
            ]
        );
        // 'animatedOutlineButton' => [
        //   'bundlePath' => $urlHelper->to(
        //       'devElements/animatedOutlineButton/public/dist/element.bundle.js'
        //   ),
        //   'elementPath' => $urlHelper->to('devElements/animatedOutlineButton/animatedOutlineButton/'),
        // @codingStandardsIgnoreLine
        //   'assetsPath' => $urlHelper->to('devElements/animatedOutlineButton/animatedOutlineButton/public/'),
        //   'settings' => [
        //       'name' => 'Animated Outline Button',
        //       'metaThumbnailUrl' => $urlHelper->to(
        //           'devElements/animatedOutlineButton/animatedOutlineButton/public/animated-outline-button-thumbnail.jpg'
        //       ),
        //       'metaPreviewUrl' => $urlHelper->to(
        //           'devElements/animatedOutlineButton/animatedOutlineButton/public/animated-outline-button-preview.jpg'
        //       ),
        //       'metaDescription' => 'Underline-to-outline button with smooth transition effect for hover state.',
        //   ],
        // ],
    }
}