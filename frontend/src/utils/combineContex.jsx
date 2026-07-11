export default function combineContext(...providers) {
    /**
     * It combines multiple context provider together and returns a Single context provider altogether
    */

    return ({ children }) => {
        return providers.reduceRight((accumulator, CurrentProvider) => {
            return (
                <CurrentProvider> 
                    {accumulator} 
                </CurrentProvider>
            );
        }, children /* Initial Value */);
    };
};

/**
 * <A>
 *      <B>
 *          <C>
 *              <D>
 *                  {Children}
 *              </D>
 *          </C>
 *      </B>
 * </A>
 */

/**
 * <Combined>
 *      {Children}
 * </Combined>
 */