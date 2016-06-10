
# PATCH for EXT JS 6.0.*

In Ext JS 6.0.* there is a bug in combination with Sencha [Cmd 6.0.2.14 - Sencha reference: SDKTOOLS-1296}(https://www.sencha.com/forum/showthread.php?305028-Reference-to-undeclared-variable-building-package-with-6.0.1) resulting in a build error. 

The following workarounds are available:

## Option 1- (preferred if you want a particular theme)
	
	--In your package.json you'll need to define a theme:
	"theme":"theme-classic" | theme-neptune | theme-triton

	More details than be described but stems from the inheritance of themes and way in which scss files are loaded.

## Option 2 - (preferred if you want just basic non-themed package)

	--Add the following lines to packages/.sencha/sencha.cfg
	skip.sass=1
	skip.slice=1


## Option 3

	--Add the following line to sass/etc/all.scss
	$font-icon-font-family: dynamic(FontAwesome);


In this directory (patch) you can find the third option applied in the file sass/etc/all.scss

