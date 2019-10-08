using Abp.Dependency;
using GraphQL;
using GraphQL.Types;
using TuDou.Grace.Queries.Container;

namespace TuDou.Grace.Schemas
{
    public class MainSchema : Schema, ITransientDependency
    {
        public MainSchema(IDependencyResolver resolver) :
            base(resolver)
        {
            Query = resolver.Resolve<QueryContainer>();
        }
    }
}