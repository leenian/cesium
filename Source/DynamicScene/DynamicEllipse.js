/*global define*/
define(['../Core/Cartesian3',
        '../Core/defaultValue',
        '../Core/defined',
        '../Core/defineProperties',
        '../Core/DeveloperError',
        '../Core/Ellipsoid',
        '../Core/Event',
        '../Core/Shapes',
        './createDynamicPropertyDescriptor'
    ], function(
        Cartesian3,
        defaultValue,
        defined,
        defineProperties,
        DeveloperError,
        Ellipsoid,
        Event,
        Shapes,
        createDynamicPropertyDescriptor) {
    "use strict";

    /**
     * An optionally time-dynamic ellipse.
     *
     * @alias DynamicEllipse
     * @constructor
     */
    var DynamicEllipse = function() {
        this._semiMajorAxis = undefined;
        this._semiMinorAxis = undefined;
        this._bearing = undefined;
        this._show = undefined;
        this._material = undefined;
        this._height = undefined;
        this._extrudedHeight = undefined;
        this._granularity = undefined;
        this._stRotation = undefined;
        this._propertyChanged = new Event();
        this._outline = undefined;
        this._outlineColor = undefined;
    };

    defineProperties(DynamicEllipse.prototype, {
        /**
         * Gets the event that is raised whenever a new property is assigned.
         * @memberof DynamicEllipse.prototype
         * @type {Event}
         */
        propertyChanged : {
            get : function() {
                return this._propertyChanged;
            }
        },

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's semi-major-axis.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        semiMajorAxis : createDynamicPropertyDescriptor('semiMajorAxis', '_semiMajorAxis'),

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's semi-minor-axis.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        semiMinorAxis : createDynamicPropertyDescriptor('semiMinorAxis', '_semiMinorAxis'),

        /**
         * Gets or sets the numeric {@link Property} specifying the ellipse's bearing.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        bearing : createDynamicPropertyDescriptor('bearing', '_bearing'),

        /**
         * Gets or sets the boolean {@link Property} specifying the polygon's visibility.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        show : createDynamicPropertyDescriptor('show', '_show'),

        /**
         * Gets or sets the {@link MaterialProperty} specifying the appearance of the polygon.
         * @memberof DynamicEllipse.prototype
         * @type {MaterialProperty}
         */
        material : createDynamicPropertyDescriptor('material', '_material'),

        /**
         * Gets or sets the Number {@link Property} specifying the height of the polygon.
         * If undefined, the polygon will be on the surface.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        height : createDynamicPropertyDescriptor('height', '_height'),

        /**
         * Gets or sets the Number {@link Property} specifying the extruded height of the polygon.
         * Setting this property creates a polygon shaped volume starting at height and ending
         * at the extruded height.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        extrudedHeight : createDynamicPropertyDescriptor('extrudedHeight', '_extrudedHeight'),

        /**
         * Gets or sets the Number {@link Property} specifying the sampling distance, in radians,
         * between each latitude and longitude point.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        granularity : createDynamicPropertyDescriptor('granularity', '_granularity'),

        /**
         * Gets or sets the Number {@link Property} specifying the rotation of the texture coordinates,
         * in radians. A positive rotation is counter-clockwise.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        stRotation : createDynamicPropertyDescriptor('stRotation', '_stRotation'),

        /**
         * Gets or sets the Boolean {@link Property} specifying whether the ellipse should be filled.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        fill : createDynamicPropertyDescriptor('fill', '_fill'),

        /**
         * Gets or sets the Boolean {@link Property} specifying whether the ellipse should be outlined.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        outline : createDynamicPropertyDescriptor('outline', '_outline'),

        /**
         * Gets or sets the Number {@link Property} specifying whether the width of the outline.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        outlineWidth : createDynamicPropertyDescriptor('outlineWidth', '_outlineWidth'),

        /**
         * Gets or sets the Color {@link Property} specifying whether the color of the outline.
         * @memberof DynamicEllipse.prototype
         * @type {Property}
         */
        outlineColor : createDynamicPropertyDescriptor('outlineColor', '_outlineColor')
    });

    /**
     * Duplicates a DynamicEllipse instance.
     * @memberof DynamicEllipse
     *
     * @param {DynamicEllipse} [result] The object onto which to store the result.
     * @returns {DynamicEllipse} The modified result parameter or a new instance if one was not provided.
     */
    DynamicEllipse.prototype.clone = function(result) {
        if (!defined(result)) {
            result = new DynamicEllipse();
        }
        result.bearing = this.bearing;
        result.semiMajorAxis = this.semiMajorAxis;
        result.semiMinorAxis = this.semiMinorAxis;
        result.show = this.show;
        result.material = this.material;
        result.height = this.height;
        result.extrudedHeight = this.extrudedHeight;
        result.granularity = this.granularity;
        result.stRotation = this.stRotation;
        result.fill = this.fill;
        result.outline = this.outline;
        result.outlineColor = this.outlineColor;
        result.outlineWidth = this.outlineWidth;
        return result;
    };

    /**
     * Assigns each unassigned property on this object to the value
     * of the same property on the provided source object.
     * @memberof DynamicEllipse
     *
     * @param {DynamicEllipse} source The object to be merged into this object.
     * @exception {DeveloperError} source is required.
     */
    DynamicEllipse.prototype.merge = function(source) {
        if (!defined(source)) {
            throw new DeveloperError('source is required.');
        }
        this.bearing = defaultValue(this.bearing, source.bearing);
        this.semiMajorAxis = defaultValue(this.semiMajorAxis, source.semiMajorAxis);
        this.semiMinorAxis = defaultValue(this.semiMinorAxis, source.semiMinorAxis);
        this.show = defaultValue(this.show, source.show);
        this.material = defaultValue(this.material, source.material);
        this.height = defaultValue(this.height, source.height);
        this.extrudedHeight = defaultValue(this.extrudedHeight, source.extrudedHeight);
        this.granularity = defaultValue(this.granularity, source.granularity);
        this.stRotation = defaultValue(this.stRotation, source.stRotation);
        this.fill = defaultValue(this.fill, source.fill);
        this.outline = defaultValue(this.outline, source.outline);
        this.outlineColor = defaultValue(this.outlineColor, source.outlineColor);
        this.outlineWidth = defaultValue(this.outlineWidth, source.outlineWidth);
    };

    return DynamicEllipse;
});
