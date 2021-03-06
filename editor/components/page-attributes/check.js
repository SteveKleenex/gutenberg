/**
 * External dependencies
 */
import { get, isEmpty } from 'lodash';

/**
 * WordPress dependencies
 */
import { withEditorSettings } from '@wordpress/blocks';
import { compose } from '@wordpress/element';
import { withSelect } from '@wordpress/data';

export function PageAttributesCheck( { availableTemplates, postType, children } ) {
	const supportsPageAttributes = get( postType, 'supports.page-attributes', false );

	// Only render fields if post type supports page attributes or available templates exist.
	if ( ! supportsPageAttributes && isEmpty( availableTemplates ) ) {
		return null;
	}

	return children;
}

const applyWithSelect = withSelect( ( select ) => {
	const { getEditedPostAttribute } = select( 'core/editor' );
	const { getPostType } = select( 'core' );
	return {
		postType: getPostType( getEditedPostAttribute( 'type' ) ),
	};
} );

const applyWithEditorSettings = withEditorSettings(
	( settings ) => ( {
		availableTemplates: settings.availableTemplates,
	} )
);

export default compose( [
	applyWithSelect,
	applyWithEditorSettings,
] )( PageAttributesCheck );
